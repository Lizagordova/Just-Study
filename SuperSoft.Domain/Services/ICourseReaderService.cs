using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface ICourseReaderService
	{
		List<Course> GetCoursesForTeacher(int courseId);
		List<UserCourse> GetUserCourses(int userId);
		List<UserCourse> GetUsersByCourse(int courseId);
	}
}