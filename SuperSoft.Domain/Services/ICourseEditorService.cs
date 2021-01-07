using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface ICourseEditorService
	{
		int AddOrUpdateCourse(Course course);
		void DeleteCourse(int courseId);
		void AttachTeacherToCourse(int courseId, int teacherId);
	}
}