using System.Collections.Generic;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;

namespace SuperSoft.Domain.Services.Courses
{
	public interface ICourseReaderService
	{
		List<Course> GetCoursesForTeacher(int userId);
		List<UserCourse> GetUserCourses(int userId);
		List<UserCourse> GetUsersByCourse(int courseId);
		List<Course> GetCoursesByQuery(CoursesInfoQuery query);
	}
}