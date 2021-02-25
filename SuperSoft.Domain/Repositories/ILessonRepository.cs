using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface ILessonRepository
	{
		int AddOrUpdateLesson(Lesson lesson);
		void AddOrUpdateLessonCourse(Lesson lesson, int courseId);
		void DeleteLesson(int lessonId);
		int AddOrUpdateMaterial(LessonMaterial lessonMaterial, int lessonId);
		void DeleteMaterial(int materialId);
		List<Lesson> GetLessonsByCourse(int courseId);
		List<LessonMaterial> GetMaterialsByLesson(int lessonId);
		LessonMaterial GetLessonMaterial(int materialId);
		Lesson GetLessonById(int lessonId);
	}
}