using System.Collections.Generic;
using System.Linq;
using SuperSoft.Domain.enums;
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

		public List<Course> GetCoursesForTeacher(int userId)
		{
			var teacherCourses = _courseRepository.GetUserCourses(userId, CourseRole.Teacher);
			var courseIds = teacherCourses.Select(c => c.CourseId).ToList();
			var courses = _courseRepository.GetCoursesByQuery(new CoursesInfoQuery() { CoursesIds = courseIds });

			return courses;
		}

		public List<UserCourse> GetUserCourses(int userId)
		{
			return _courseRepository.GetUserCourses(userId, CourseRole.Pupil);
		}

		public List<UserCourse> GetUsersByCourse(int courseId)
		{
			return _courseRepository.GetUsersByCourse(courseId);
		}

		public List<Course> GetCoursesByQuery(CoursesInfoQuery query)
		{
			return _courseRepository.GetCoursesByQuery(query);
		}
	}
}