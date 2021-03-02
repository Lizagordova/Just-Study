using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Feedbacks
{
	public interface IFeedbackEditorService
	{
		void AddFeedback(Feedback feedback);
	}
}