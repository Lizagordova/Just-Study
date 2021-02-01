using Microsoft.AspNetCore.Http;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface ILessonEditorService
	{
		int AddOrUpdateLesson(Lesson lesson, int courseId);
		void DeleteLesson(int lessonId);
		int AddOrUpdateMaterial(LessonMaterial lessonMaterial, int lessonId, IFormFile file);
		void DeleteMaterial(int materialId);
	}
}