using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface ITrackerRepository
	{
		int AddOrUpdateTracker(Tracker tracker);
		void AddOrUpdateTrackersByDay(IReadOnlyCollection<TrackerByDay> trackersByDay, int trackerId);
		Tracker GetTracker(int userId, int courseId);
	}
}