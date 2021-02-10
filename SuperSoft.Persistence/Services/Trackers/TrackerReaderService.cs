using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Trackers;

namespace SuperSoft.Persistence.Services.Trackers
{
	public class TrackerReaderService : ITrackerReaderService
	{
		private readonly ITrackerRepository _trackerRepository;

		public TrackerReaderService(
			ITrackerRepository trackerRepository)
		{
			_trackerRepository = trackerRepository;
		}

		public Tracker GetTracker(int userId, int courseId)
		{
			var tracker = _trackerRepository.GetTracker(userId, courseId);

			return tracker;
		}
	}
}