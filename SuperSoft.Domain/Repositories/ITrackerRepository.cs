using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface ITrackerRepository
	{
		void AddOrUpdateTracker(Tracker tracker);
		Tracker GetTracker(int userId, int courseId);
	}
}