using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Trackers;

namespace SuperSoft.Persistence.Services.Trackers
{
	public class TrackerEditorService : ITrackerEditorService
	{
		private readonly ITrackerRepository _trackerRepository;

		public TrackerEditorService(
			ITrackerRepository trackerRepository)
		{
			_trackerRepository = trackerRepository;
		}

		public int AddOrUpdateTracker(Tracker tracker, int userId, int courseId)
		{
			var trackerId = _trackerRepository.AddOrUpdateTracker(tracker, userId, courseId);
			_trackerRepository.AddOrUpdateTrackersByDay(tracker.TrackersByDay, trackerId);

			return trackerId;
		}
	}
}