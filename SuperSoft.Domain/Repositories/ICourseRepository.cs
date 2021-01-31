using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;

namespace SuperSoft.Domain.Repositories
{
	public interface ICourseRepository
	{
		int AddOrUpdateCourse(Course course);
		void AttachTeacherToCourse(int courseId, int teacherId);
		void AddOrUpdateParticipantsList(IReadOnlyCollection<int> participantsIds, int courseId);//todo: здесь ещё надо обновлять табличку Course_User и удалять данные о тарифах и т д
		void AddOrUpdateUserCourse(UserCourse userCourse);
		void DeleteCourse(int courseId);
		List<Course> GetCoursesForTeacher(int courseId);
		List<UserCourse> GetUserCourses(int userId);
		List<UserCourse> GetUsersByCourse(int courseId);
		List<Course> GetCourses(CoursesInfoQuery query);
	}
}