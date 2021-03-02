using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface IFeedbackRepository
	{
		void AddFeedBack(Feedback feedback);
	}
}