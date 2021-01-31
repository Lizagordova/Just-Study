using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services.Courses
{
	public class CourseReaderService : ICourseReaderService
	{
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