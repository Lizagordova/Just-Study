using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services.Lessons
{
	public class LessonReaderService : ILessonReaderService
	{
		public List<Lesson> GetLessonsByCourse(int courseId)
		{
			throw new System.NotImplementedException();
		}

		public List<LessonMaterial> GetMaterialsByLesson(int lessonId)
		{
			throw new System.NotImplementedException();
		}
	}
}