using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Feedbacks;

namespace SuperSoft.Persistence.Services.Feedbacks
{
	public class FeedbackReaderService : IFeedbackReaderService
	{
		private readonly IFeedbackRepository _feedbackRepository;
		public FeedbackReaderService(
			IFeedbackRepository feedbackRepository)
		{
			_feedbackRepository = feedbackRepository;
		}
		
		public List<Feedback> GetFeedbacks(bool old)
		{
			var feedbacks = _feedbackRepository.GetFeedbacks(old);

			return feedbacks;
		}
	}
}