using System.Data;
using Dapper;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models.Dto;
using SuperSoft.Persistence.Services.MapperService;

namespace SuperSoft.Persistence.Repositories
{
	public class LogRepository : ILogRepository
	{
		private readonly MapperService _mapper;
		private const string AddLogSp = "LogRepository_AddLog";

		public LogRepository(
			MapperService mapper)
		{
			_mapper = mapper;
		}

		public void AddLog(Log log)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddLogParam(log);
			conn.Query(AddLogSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		private DynamicTvpParameters GetAddLogParam(Log log)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("log", "UDT_Log");
			var logUdt = _mapper.Map<Log, LogUdt>(log);
			tvp.AddObjectAsRow(logUdt);
			param.Add(tvp);

			return param;
		}
	}
}