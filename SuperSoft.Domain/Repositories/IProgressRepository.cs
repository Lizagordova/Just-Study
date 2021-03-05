namespace SuperSoft.Domain.Repositories
{
	public interface IProgressRepository
	{
		int GetUserCourseProgress(int userId, int courseId);
		int GetProgressByLesson(int lessonId);
	}
}