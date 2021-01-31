using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Repositories;

namespace SuperSoft.Persistence.Repositories
{
	public class CourseRepository : ICourseRepository
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

		public List<Course> GetCoursesForTeacher(int courseId)
		{
			throw new System.NotImplementedException();
		}

		public List<UserCourse> GetUserCourses(int userId)
		{
			throw new System.NotImplementedException();
		}

		public List<UserCourse> GetUsersByCourse(int courseId)
		{
			throw new System.NotImplementedException();
		}

		public List<Course> GetCourses(CoursesInfoQuery query)
		{
			throw new System.NotImplementedException();
		}
	}
}