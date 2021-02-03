using System.Configuration;
using System.Data.SqlClient;

namespace SuperSoft.Persistence.Helpers
{
	public static class DatabaseHelper
	{
		public static SqlConnection OpenConnection()
		{
			var connectionString = ConfigurationManager.ConnectionStrings["JustStudy"];
				var conn = connectionString.ConnectionString;
			var connection = new SqlConnection(conn);
			connection.Open();

			return connection;
		}

		public static void CloseConnection(SqlConnection connection)
		{
			connection.Close();
		}
	}
}