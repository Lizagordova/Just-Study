using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface ICourseEditorService
	{
		int AddOrUpdateCourse(Course course);
		void AttachTeacherToCourse(int courseId, int teacherId);
		void AddOrUpdateParticipantsList(IReadOnlyCollection<int> participantsIds, int courseId);
		void DeleteCourse(int courseId);
	}
}