using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface ICourseEditorService
	{
		int AddOrUpdateCourse(Course course);
		void AttachTeacherToCourse(int courseId, int teacherId);
		void AddOrUpdateParticipantsList(IReadOnlyCollection<int> participantsIds, int courseId);//todo: здесь ещё надо обновлять табличку Course_User и удалять данные о тарифах и т д
		void AddOrUpdateUserCourse(UserCourse userCourse);
		void DeleteCourse(int courseId);
	}
}