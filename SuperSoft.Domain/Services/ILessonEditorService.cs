using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface ILessonEditorService
	{
		int AddOrUpdateLesson(Lesson lesson, int courseId);
		void DeleteLesson(int lessonId);
		int AddOrUpdateMaterial(LessonMaterial lessonMaterial);
		void DeleteMaterial(int materialId);
	}
}