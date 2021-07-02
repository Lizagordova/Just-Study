using Microsoft.AspNetCore.Http;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Lessons
{
	public interface ILessonEditorService
	{
		int AddOrUpdateLesson(Lesson lesson, int courseId);
		void DeleteLesson(int lessonId);
		int AddOrUpdateMaterial(LessonMaterial lessonMaterial, int lessonId, IFormFile file);
		int AddOrUpdateMaterial1(LessonMaterial lessonMaterial, int lessonId, IFormFile file, string offset, string fileName);
		void DeleteMaterial(int materialId);
		void DeleteMaterial(int lessonId, IFormFile file);
	}
}