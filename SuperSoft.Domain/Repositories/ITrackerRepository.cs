using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface ITrackerRepository
	{
		void AddOrUpdateTracker(Tracker tracker);
		void AddOrUpdateTrackersByDay(List<TrackerByDay> trackersByDay, int trackerId);
		Tracker GetTracker(int userId, int courseId);
	}
}