using System.Data;
using System.Linq;
using Dapper;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;

namespace SuperSoft.Persistence.Repositories
{
	public class ProgressRepository : IProgressRepository
	{
		private const string AddOrUpdateCourseSp = "ProgressRepository_GetUserCourseProgress";
		private const string GetProgressByLessonSp = "ProgressRepository_GetProgressByLesson";
		public int GetUserCourseProgress(int userId, int courseId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetUserCourseProgressParam(userId, courseId);
			var progress = conn.Query<int>(AddOrUpdateCourseSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return progress;
		}

		public int GetProgressByLesson(int lessonId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetLessonParam(lessonId);
			var progress = conn.Query<int>(GetProgressByLessonSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return progress;
		}

		private DynamicTvpParameters GetLessonParam(int lessonId)
		{
			var param = new DynamicTvpParameters();
			param.Add("lessonId", lessonId);

			return param;
		}
		
		private DynamicTvpParameters GetUserCourseProgressParam(int userId, int courseId)
		{
			var param = new DynamicTvpParameters();
			param.Add("userId", userId);
			param.Add("courseId", courseId);

			return param;
		}
	}
}