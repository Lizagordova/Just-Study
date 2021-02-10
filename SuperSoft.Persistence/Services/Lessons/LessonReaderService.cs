using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Lessons;

namespace SuperSoft.Persistence.Services.Lessons
{
	public class LessonReaderService : ILessonReaderService
	{
		private readonly ILessonRepository _lessonRepository;
		public LessonReaderService(
			ILessonRepository lessonRepository)
		{
			_lessonRepository = lessonRepository;
		}

		public List<Lesson> GetLessonsByCourse(int courseId)
		{
			var lessons = _lessonRepository.GetLessonsByCourse(courseId);

			return lessons;
		}

		public List<LessonMaterial> GetMaterialsByLesson(int lessonId)
		{
			var materials = _lessonRepository.GetMaterialsByLesson(lessonId);

			return materials;
		}
	}
}