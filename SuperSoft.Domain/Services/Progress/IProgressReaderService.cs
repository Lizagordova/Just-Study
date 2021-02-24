namespace SuperSoft.Domain.Services.Progress
{
	public interface IProgressReaderService
	{
		int GetUserCourseProgress(int userId, int courseId);
	}
}