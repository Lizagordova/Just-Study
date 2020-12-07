using System.Collections.Generic;
using System.Data;
using Dapper;

namespace SuperSoft.Persistence.Extensions
{
	public class DynamicTvpParameters : DynamicParameters, SqlMapper.IDynamicParameters
	{
		private readonly List<SqlMapper.IDynamicParameters> _tvps;

		#region Constructors

		public DynamicTvpParameters()
			: this(null)
		{
		}

		public DynamicTvpParameters(object template)
			: base(template)
		{
			_tvps = new List<SqlMapper.IDynamicParameters>();
		}

		#endregion

		/// <summary>
		/// Добавляет TVP для передачи в запрос
		/// </summary>
		/// <param name="param"></param>
		public DynamicTvpParameters Add(TableValuedParameter param)
		{
			_tvps.Add(param);
			return this;
		}
		
		/// <summary>
		/// Добавляет TVP для передачи в запрос
		/// </summary>
		/// <param name="param"></param>
		public DynamicTvpParameters Add<T>(ExpressionTableValueParameter<T> param)
		{
			_tvps.Add(param);
			return this;
		}

		void SqlMapper.IDynamicParameters.AddParameters(IDbCommand command, SqlMapper.Identity identity)
		{
			AddParameters(command, identity);
			foreach (var param in _tvps)
			{
				param.AddParameters(command, identity);
			}
		}
	}
}