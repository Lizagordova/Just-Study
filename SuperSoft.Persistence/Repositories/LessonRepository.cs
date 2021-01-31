using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;

namespace SuperSoft.Persistence.Repositories
{
	public class LessonRepository : ILessonRepository
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