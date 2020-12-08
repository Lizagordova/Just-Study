using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlTypes;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Dapper;
using System.Data.SqlClient;
using Microsoft.SqlServer.Server;

namespace SuperSoft.Persistence.Extensions
{
public class ExpressionTableValueParameter<T> : SqlMapper.IDynamicParameters
	{
		private readonly string _name;
		private readonly string _type;
		private PropertyInfo[] _properties;
		private List<Func<T, object>> _getters;
		private SqlMetaData[] _scheme;
		private List<SqlDataRecord> _rows;

		#region Constructors

		public ExpressionTableValueParameter(string paramName, string typeName)
		{
			_name = paramName;
			_type = typeName;
		}

		#endregion

		/// <summary>
		/// Добавляет во внутреннее представление таблицы объект-ряд
		/// Если это первый добавленный объект, на его основе будет сконструирована схема таблицы
		/// </summary>
		/// <param name="toTable">Объект для добавления</param>
		public void AddObjectAsRow(T toTable)
		{
			if (_rows == null)
			{
				_scheme = ConstructSchemeFromObject(toTable);
				_rows = new List<SqlDataRecord>();
			}

			try
			{
				var newRecord = new SqlDataRecord(_scheme);
				var values = _getters.Select(getter => getter(toTable)).ToArray();

				newRecord.SetValues(values);

				_rows.Add(newRecord);
			}
			catch (Exception ex)
			{
				throw new ArgumentException("Добавление объекта в TVP провалилось.", ex);
			}
		}

		/// <summary>
		/// Добавляет во внутреннее представление таблицы список
		/// </summary>
		/// <typeparam name="T">Тип объектов списка</typeparam>
		/// <param name="list"></param>
		public void AddGenericList(IEnumerable<T> list)
		{
			foreach (var obj in list)
			{
				AddObjectAsRow(obj);
			}
		}

		/// <summary>
		/// Add all the parameters needed to the command just before it executes
		/// </summary>
		/// <param name="command">The raw command prior to execution</param>
		/// <param name="identity">Information about the query</param>
		public void AddParameters(IDbCommand command, SqlMapper.Identity identity)
		{
			var sqlCommand = (SqlCommand) command;

			var parameter = sqlCommand.Parameters.Add("@" + _name, SqlDbType.Structured);
			parameter.Direction = ParameterDirection.Input;
			parameter.TypeName = _type;
			parameter.Value = _rows;
		}

		/// <summary>
		/// Возвращает сформированную таблицу (используется в тесте)
		/// </summary>
		/// <returns></returns>
		public IReadOnlyCollection<SqlDataRecord> ReturnValue()
		{
			return _rows;
		}

		private PropertyInfo[] GetPropertiesInRightOrder(Type type)
		{
			const BindingFlags flags = BindingFlags.Instance | BindingFlags.Static | BindingFlags.Public;
			if (type.BaseType == typeof(object))
				return type.GetProperties(flags);

			if (type.BaseType != null)
			{
				var baseProps = GetPropertiesInRightOrder(type.BaseType);
				var props = type.GetProperties(flags);

				return baseProps
					.Concat(
						props.Where(p => baseProps
							.Select(b => b.Name)
							.Contains(p.Name) == false))
					.ToArray();
			}

			throw new ArgumentException("Can't get properties from type " + type.Name, nameof(type));
		}

		/// <summary>
		/// Конструирует схему для SqlDataRecord на основе переданного объекта.
		/// </summary>
		/// <param name="example">Объект-образец.</param>
		/// <returns>Полученная схема.</returns>
		private SqlMetaData[] ConstructSchemeFromObject(T example)
		{
			var type = example.GetType();
			// Если класс не отнаследован, то просто выбираем все его свойства
			_properties = GetPropertiesInRightOrder(type);
			_getters = _properties.Select(GetValueGetter).ToList();

			var scheme = new List<SqlMetaData>();

			foreach (var property in _properties)
			{
				SqlMetaData data = null;

				if (property.PropertyType != typeof(TimeSpan) && property.PropertyType != typeof(DateTimeOffset))
				{
					var propertyType = property.PropertyType;

					propertyType = Nullable.GetUnderlyingType(propertyType) ?? propertyType;

					data = InferFromType(property.GetValue(example), propertyType, property.Name);
				}

				if (property.GetValue(example) != null)
				{
					data = data ?? SqlMetaData.InferFromValue(property.GetValue(example), property.Name);
				}

				if (data == null)
				{
					throw new ArgumentException(
						"В TableValuedParemeter был передан некорректный объект для добавления.");
				}

				scheme.Add(data);
			}

			return scheme.ToArray();
		}

		/// <summary>
		/// Создаёт SqlMetaData по объекту и его типу
		/// Является поправленной версией SqlMetaData.InferFromValue
		/// </summary>
		/// <param name="value"></param>
		/// <param name="type"></param>
		/// <param name="name"></param>
		/// <returns></returns>
		private static SqlMetaData InferFromType(object value, Type type, string name)
		{

			SqlMetaData sqlMetaData = null;
			switch (Type.GetTypeCode(type))
			{
				case TypeCode.Empty:
					break;

				case TypeCode.Object:
					sqlMetaData = InferFromTypeForObjectTypeCode(value, type, name);
					break;

				case TypeCode.Boolean:
					sqlMetaData = new SqlMetaData(name, SqlDbType.Bit);
					break;

				case TypeCode.Char:
					sqlMetaData = new SqlMetaData(name, SqlDbType.NVarChar, 1);
					break;

				case TypeCode.Byte:
					sqlMetaData = new SqlMetaData(name, SqlDbType.TinyInt);
					break;

				case TypeCode.Int16:
					sqlMetaData = new SqlMetaData(name, SqlDbType.SmallInt);
					break;

				case TypeCode.Int32:
					sqlMetaData = new SqlMetaData(name, SqlDbType.Int);
					break;

				case TypeCode.Int64:
					sqlMetaData = new SqlMetaData(name, SqlDbType.BigInt);
					break;

				case TypeCode.Single:
					sqlMetaData = new SqlMetaData(name, SqlDbType.Real);
					break;

				case TypeCode.Double:
					sqlMetaData = new SqlMetaData(name, SqlDbType.Float);
					break;

				case TypeCode.Decimal:
					var @decimal = (decimal?) value;
					byte precision = 18;
					byte scale = 0;
					if (@decimal.HasValue)
					{
						var sqlDecimal = new SqlDecimal(@decimal.Value);
						precision = sqlDecimal.Precision;
						scale = sqlDecimal.Scale;
					}

					sqlMetaData = new SqlMetaData(name, SqlDbType.Decimal, precision, scale);
					break;

				case TypeCode.DateTime:
					sqlMetaData = new SqlMetaData(name, SqlDbType.DateTime);
					break;

				case TypeCode.String:
					sqlMetaData = new SqlMetaData(name, SqlDbType.NVarChar, SqlMetaData.Max);
					break;

			}

			return sqlMetaData;
		}

		/// <summary>
		/// Создаёт SqlMetaData по объекту и его типу если код типа объекта определился как <see cref="TypeCode.Object"/>.
		/// </summary>
		/// <param name="value"></param>
		/// <param name="type"></param>
		/// <param name="name"></param>
		/// <returns></returns>
		private static SqlMetaData InferFromTypeForObjectTypeCode(object value, Type type, string name)
		{
			SqlMetaData sqlMetaData = null;

			if (type == typeof(byte[]))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.VarBinary, SqlMetaData.Max);
			}
			else if (type == typeof(char[]))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.NVarChar, SqlMetaData.Max);
			}
			else if (type == typeof(Guid))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.UniqueIdentifier);
			}
			else if (type == typeof(object))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.Variant);
			}
			else if (type == typeof(SqlBinary))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.VarBinary, SqlMetaData.Max);
			}
			else if (type == typeof(SqlBoolean))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.Bit);
			}
			else if (type == typeof(SqlByte))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.TinyInt);
			}
			else if (type == typeof(SqlDateTime))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.DateTime);
			}
			else if (type == typeof(SqlDouble))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.Float);
			}
			else if (type == typeof(SqlGuid))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.UniqueIdentifier);
			}
			else if (type == typeof(SqlInt16))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.SmallInt);
			}
			else if (type == typeof(SqlInt32))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.Int);
			}
			else if (type == typeof(SqlInt64))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.BigInt);
			}
			else if (type == typeof(SqlMoney))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.Money);
			}
			else if (type == typeof(SqlDecimal))
			{
				byte precision = 18;
				byte scale = 0;
				var sqlDecimal = (SqlDecimal?) value;
				if (sqlDecimal.HasValue && !sqlDecimal.Value.IsNull)
				{
					precision = sqlDecimal.Value.Precision;
					scale = sqlDecimal.Value.Scale;
				}

				sqlMetaData = new SqlMetaData(name, SqlDbType.Decimal, precision, scale);
			}
			else if (type == typeof(SqlSingle))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.Real);
			}
			else if (type == typeof(SqlString))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.NVarChar, SqlMetaData.Max);
			}
			else if (type == typeof(SqlChars))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.NVarChar, SqlMetaData.Max);
			}
			else if (type == typeof(SqlBytes))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.VarBinary, SqlMetaData.Max);
			}
			else if (type == typeof(SqlXml))
			{
				sqlMetaData = new SqlMetaData(name, SqlDbType.Xml);
			}

			return sqlMetaData;
		}
		
		public static Func<T, object> GetValueGetter(PropertyInfo propertyInfo)
		{
			var type = typeof(T);
			var instanceParam = Expression.Parameter(type);
			return Expression.Lambda<Func<T, object>>( 
				Expression.Convert( 
					Expression.Call(instanceParam, propertyInfo.GetGetMethod()), 
					typeof(object) 
				), 
				instanceParam).Compile();
		}
	}
}