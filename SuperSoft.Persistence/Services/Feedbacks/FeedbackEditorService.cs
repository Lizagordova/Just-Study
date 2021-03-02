using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Feedbacks;

namespace SuperSoft.Persistence.Services.Feedbacks
{
	public class FeedbackEditorService : IFeedbackEditorService
	{
		private readonly IFeedbackRepository _feedbackRepository;

		public FeedbackEditorService(
			IFeedbackRepository feedbackRepository)
		{
			_feedbackRepository = feedbackRepository;
		}

		public void AddFeedback(Feedback feedback)
		{
			_feedbackRepository.AddFeedBack(feedback);
		}
	}
}