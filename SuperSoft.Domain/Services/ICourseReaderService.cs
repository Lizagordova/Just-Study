using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;

namespace SuperSoft.Domain.Services
{
	public interface ICourseReaderService
	{
		List<Course> GetCoursesForTeacher(int courseId);
		List<UserCourse> GetUserCourses(int userId);
		List<UserCourse> GetUsersByCourse(int courseId);
		List<Course> GetCourses(CoursesInfoQuery query);
	}
}