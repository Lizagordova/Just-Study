using System.Collections.Generic;
using System.Data;
using System.Linq;
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
		private const string AddFeedBackSp = "FeedbackRepository_AddFeedback";
		private const string GetFeedbacksSp = "FeedbackRepository_GetFeedbacks";

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

		public List<Feedback> GetFeedbacks(bool old)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = new DynamicTvpParameters();
			param.Add("old", old);
			var feedbacksUdt = conn.Query<FeedbackUdt>(GetFeedbacksSp, param, commandType: CommandType.StoredProcedure);
			var feedbacks = feedbacksUdt.Select(_mapper.Map<FeedbackUdt, Feedback>).ToList();
			DatabaseHelper.CloseConnection(conn);

			return feedbacks;
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