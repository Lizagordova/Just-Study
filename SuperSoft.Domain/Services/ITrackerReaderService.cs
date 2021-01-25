using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface ITrackerReaderService
	{
		Tracker GetTracker(int userId, int courseId);
	}
}