using System.Collections.Generic;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services.Courses
{
	public class CourseEditorService : ICourseEditorService
	{
		private readonly ICourseRepository _courseRepository;
		public CourseEditorService(
			ICourseRepository courseRepository)
		{
			_courseRepository = courseRepository;
		}

		public int AddOrUpdateCourse(Course course)
		{
			return _courseRepository.AddOrUpdateCourse(course);
		}

		public void AttachTeacherToCourse(int courseId, int teacherId)
		{
			var userCourse = new UserCourse()
			{
				UserId = teacherId,
				CourseId = courseId,
				CourseRole = CourseRole.Teacher
			};
			_courseRepository.AddOrUpdateUserCourse(userCourse);
		}

		public void AddOrUpdateParticipantsList(IReadOnlyCollection<int> participantsIds, int courseId)
		{
			_courseRepository.AddOrUpdateParticipantsList(participantsIds, courseId);
		}

		public void AddOrUpdateUserCourse(UserCourse userCourse)
		{
			_courseRepository.AddOrUpdateUserCourse(userCourse);
		}

		public void DeleteCourse(int courseId)
		{
			_courseRepository.DeleteCourse(courseId);
		}
	}
}