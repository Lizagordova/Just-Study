using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Lessons
{
	public interface ILessonReaderService
	{
		List<Lesson> GetLessonsByCourse(int courseId);
		List<LessonMaterial> GetMaterialsByLesson(int lessonId);
	}
}