﻿using System.Configuration;
using System.Data.SqlClient;

namespace SuperSoft.Persistence.Helpers
{
	public static class DatabaseHelper
	{
		public static SqlConnection OpenConnection()
		{
			var connectionString = "";
			connectionString = ConfigurationManager.AppSettings["production"] == "true" 
				? ConfigurationManager.ConnectionStrings["JustStudyProduction"].ConnectionString
				: ConfigurationManager.ConnectionStrings["JustStudy"].ConnectionString;
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