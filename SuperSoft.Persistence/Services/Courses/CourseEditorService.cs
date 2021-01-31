using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services.Courses
{
	public class CourseEditorService : ICourseEditorService
	{
		public int AddOrUpdateCourse(Course course)
		{
			throw new System.NotImplementedException();
		}

		public void AttachTeacherToCourse(int courseId, int teacherId)
		{
			throw new System.NotImplementedException();
		}

		public void AddOrUpdateParticipantsList(IReadOnlyCollection<int> participantsIds, int courseId)
		{
			throw new System.NotImplementedException();
		}

		public void AddOrUpdateUserCourse(UserCourse userCourse)
		{
			throw new System.NotImplementedException();
		}

		public void DeleteCourse(int courseId)
		{
			throw new System.NotImplementedException();
		}
	}
}