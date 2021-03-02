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
	public class FeedbackRepository : IFeedbackRepository
	{
		private readonly MapperService _mapper;
		private const string AddFeedBackSp = "FeedbackRepository_AddFeedBack";

		public FeedbackRepository(
			MapperService mapper)
		{
			_mapper = mapper;
		}

		public void AddFeedBack(Feedback feedback)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetFeedbackParam(feedback);
			conn.Query(AddFeedBackSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		private DynamicTvpParameters GetFeedbackParam(Feedback feedback)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("feedback", "UDT_Feedback");
			var udt = _mapper.Map<Feedback, FeedbackUdt>(feedback);
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}
	}
}