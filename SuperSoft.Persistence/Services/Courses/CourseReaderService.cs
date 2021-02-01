using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services.Courses
{
	public class CourseReaderService : ICourseReaderService
	{
		private readonly ICourseRepository _courseRepository;

		public CourseReaderService(
			ICourseRepository courseRepository)
		{
			_courseRepository = courseRepository;
		}

		public List<Course> GetCoursesForTeacher(int courseId)
		{
			return _courseRepository.GetCoursesForTeacher(courseId);
		}

		public List<UserCourse> GetUserCourses(int userId)
		{
			return _courseRepository.GetUserCourses(userId);
		}

		public List<UserCourse> GetUsersByCourse(int courseId)
		{
			return _courseRepository.GetUsersByCourse(courseId);
		}

		public List<Course> GetCourses(CoursesInfoQuery query)
		{
			return _courseRepository.GetCourses(query);
		}
	}
}