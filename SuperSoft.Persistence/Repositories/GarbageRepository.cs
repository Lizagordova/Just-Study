using System.Data;
using System.Linq;
using Dapper;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Repositories
{
	public class GarbageRepository : IGarbageRepository
	{
		private const string AddFileToDeleteSp = "GarbageRepository_AddFileToDelete";

		public void FileToDelete(string path)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetFileToDeleteParam(path);
			var groupId = conn.Query<int>(AddFileToDeleteSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);
		}

		private DynamicTvpParameters GetFileToDeleteParam(string path)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("fileToDelete", "UDT_FileToDelete");
			var udt = new QueueToDeleteUdt { Path = path };
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}
	}
}