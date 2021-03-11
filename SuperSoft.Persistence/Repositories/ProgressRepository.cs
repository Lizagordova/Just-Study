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
		private const string GetUserProgressByLessonSp = "ProgressRepository_GetUserProgressByLesson";

		public int GetUserCourseProgress(int userId, int courseId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetUserProgressParam(userId, courseId);
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

		public int GetUserProgressByLesson(int userId, int lessonId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetUserProgressParam(userId, lessonId: lessonId);
			var progress = conn.Query<int>(GetUserProgressByLessonSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return progress;
		}

		private DynamicTvpParameters GetLessonParam(int lessonId)
		{
			var param = new DynamicTvpParameters();
			param.Add("lessonId", lessonId);

			return param;
		}
		
		private DynamicTvpParameters GetUserProgressParam(int userId, int? courseId = null, int? lessonId = null)
		{
			var param = new DynamicTvpParameters();
			param.Add("userId", userId);
			if (courseId != null)
			{
				param.Add("courseId", courseId);
			}
			if (lessonId != null)
			{
				param.Add("lessonId", courseId);
			}

			return param;
		}
	}
}