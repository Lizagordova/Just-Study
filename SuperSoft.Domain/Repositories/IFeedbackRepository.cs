using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface IFeedbackRepository
	{
		void AddFeedBack(Feedback feedback);
		List<Feedback> GetFeedbacks(bool old);
	}
}