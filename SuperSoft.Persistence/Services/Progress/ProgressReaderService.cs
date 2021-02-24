using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Progress;

namespace SuperSoft.Persistence.Services.Progress
{
	public class ProgressReaderService : IProgressReaderService
	{
		private readonly IProgressRepository _progressRepository;

		public ProgressReaderService(
			IProgressRepository progressRepository)
		{
			_progressRepository = progressRepository;
		}
		
		public int GetUserCourseProgress(int userId, int courseId)
		{
			var progress = _progressRepository.GetUserCourseProgress(userId, courseId);

			return progress;
		}
	}
}