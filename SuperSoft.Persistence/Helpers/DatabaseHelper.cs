using System.Configuration;
using System.Data.SqlClient;

namespace SuperSoft.Persistence.Helpers
{
	public static class DatabaseHelper
	{
		public static SqlConnection OpenConnection()
		{
			//var connectionString = ConfigurationManager.ConnectionStrings["JustStudy"].ConnectionString;
			var connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=Just-Study; User ID=JL;Password=berlindream;Connect Timeout=5;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;Integrated Security=True";
			var connection = new SqlConnection(connectionString);
			connection.Open();

			return connection;
		}

		public static void CloseConnection(SqlConnection connection)
		{
			connection.Close();
		}
	}
}