using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;

namespace SuperSoft.Persistence.Extensions
{
	public static class BaseDapperRepository
	{
		public static Tuple<IReadOnlyCollection<T1>, IReadOnlyCollection<T2>> QueryMultiple<T1, T2>(this SqlConnection connection, string sql, object param, int? timeout = null)
		{
			var grid = connection.QueryMultiple(sql, param, commandType: CommandType.StoredProcedure, commandTimeout: timeout);
			var t1 = grid.Read<T1>().ToList();
			var t2 = grid.Read<T2>().ToList();
			return new Tuple<IReadOnlyCollection<T1>, IReadOnlyCollection<T2>>(t1, t2);
		}
	}
}