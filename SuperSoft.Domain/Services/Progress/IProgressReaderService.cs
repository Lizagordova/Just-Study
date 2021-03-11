namespace SuperSoft.Domain.Services.Progress
{
	public interface IProgressReaderService
	{
		int GetUserCourseProgress(int userId, int courseId);
		int GetProgressByLesson(int lessonId);
		int GetUserProgressByLesson(int userId, int lessonId);
	}
}