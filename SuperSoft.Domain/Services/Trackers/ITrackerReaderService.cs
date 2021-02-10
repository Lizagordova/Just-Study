using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Trackers
{
	public interface ITrackerReaderService
	{
		Tracker GetTracker(int userId, int courseId);
	}
}