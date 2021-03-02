using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Feedbacks
{
	public interface IFeedbackReaderService
	{
		List<Feedback> GetFeedbacks(bool old);
	}
}