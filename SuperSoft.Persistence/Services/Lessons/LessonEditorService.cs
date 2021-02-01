using System.IO;
using Microsoft.AspNetCore.Http;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Helpers;

namespace SuperSoft.Persistence.Services.Lessons
{
	public class LessonEditorService : ILessonEditorService
	{
		private readonly ILessonRepository _lessonRepository;

		public LessonEditorService(
			ILessonRepository lessonRepository)
		{
			_lessonRepository = lessonRepository;
		}

		public int AddOrUpdateLesson(Lesson lesson, int courseId)
		{
			var lessonId = _lessonRepository.AddOrUpdateLesson(lesson, courseId);

			return lessonId;
		}

		public void DeleteLesson(int lessonId)
		{
			_lessonRepository.DeleteLesson(lessonId);
		}

		public int AddOrUpdateMaterial(LessonMaterial lessonMaterial, int lessonId, IFormFile file)
		{
			var bytes = GetBytes(file);
			var path = GetPath(lessonId, file.FileName);
			SaveContent(bytes, path);
			lessonMaterial.Path = path;
			var materialId = _lessonRepository.AddOrUpdateMaterial(lessonMaterial, lessonId);

			return materialId;
		}

		public void DeleteMaterial(int materialId)
		{
			var lessonMaterial = _lessonRepository.GetLessonMaterial(materialId);
			var path = lessonMaterial.Path;
			if (File.Exists(path))
			{
				File.Delete(path);
			}
			_lessonRepository.DeleteMaterial(materialId);
		}

		private byte[] GetBytes(IFormFile file)
		{
			byte[] fileBytes;
			using (var memoryStream = new MemoryStream())
			{
				file.CopyTo(memoryStream);
				fileBytes = memoryStream.ToArray();
			}

			return fileBytes;
		}

		private void SaveContent(byte[] fileBytes, string path)
		{
			System.IO.File.WriteAllBytes(path, fileBytes);
		}

		private string GetPath(int lessonId, string fileName)
		{
			var path = PathHelper.GetLessonMaterialPath(lessonId);
			if (!Directory.Exists(path))
			{
				Directory.CreateDirectory(path);
			}

			path = $"{path}/{fileName}";

			return path;
		}
	}
}