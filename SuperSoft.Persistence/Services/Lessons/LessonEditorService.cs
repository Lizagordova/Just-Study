using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services.Lessons
{
	public class LessonEditorService : ILessonEditorService
	{
		public int AddOrUpdateLesson(Lesson lesson, int courseId)
		{
			throw new System.NotImplementedException();
		}

		public void DeleteLesson(int lessonId)
		{
			throw new System.NotImplementedException();
		}

		public int AddOrUpdateMaterial(LessonMaterial lessonMaterial, int lessonId)
		{
			throw new System.NotImplementedException();
		}

		public void DeleteMaterial(int materialId)
		{
			throw new System.NotImplementedException();
		}
	}
}