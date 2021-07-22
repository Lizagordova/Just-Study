using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Http;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Lessons;
using SuperSoft.Persistence.Helpers;

namespace SuperSoft.Persistence.Services.Lessons
{
	public class LessonEditorService : ILessonEditorService
	{
		private readonly ILessonRepository _lessonRepository;
		private readonly IGarbageRepository _garbageRepository;

		public LessonEditorService(
			ILessonRepository lessonRepository,
			IGarbageRepository garbageRepository
			)
		{
			_lessonRepository = lessonRepository;
			_garbageRepository = garbageRepository;
		}

		public int AddOrUpdateLesson(Lesson lesson, int courseId)
		{
			var lessonId = _lessonRepository.AddOrUpdateLesson(lesson);
			lesson.Id = lessonId;
			_lessonRepository.AddOrUpdateLessonCourse(lesson, courseId);

			return lessonId;
		}

		public void DeleteLesson(int lessonId)
		{
			var lessonMaterials = _lessonRepository.GetMaterialsByLesson(lessonId);
			lessonMaterials.ForEach(lm =>
			{
				if (File.Exists(lm.Path))
				{
					File.Delete(lm.Path);//todo: сделать что-то более усложнённое	
				}
			});
			_lessonRepository.DeleteLesson(lessonId);
		}

		public int AddOrUpdateMaterial(LessonMaterial lessonMaterial, int lessonId, IFormFile file)
		{
			var bytes = FileHelper.GetBytes(file);
			var path = GetPath(lessonId, file.FileName);
			FileHelper.SaveContent(bytes, path);
			lessonMaterial.Path = path;
			var materialId = _lessonRepository.AddOrUpdateMaterial(lessonMaterial, lessonId);

			return materialId;
		}

		// private string PostHandle(string path)
		// {
		// 	var outPath = path;
		// 	if (path.Contains("pptx"))
		// 	{
		// 		ComponentInfo.SetLicense("FREE-LIMITED-KEY");
		//
		// 		var presentation = PresentationDocument.Load(path);
		// 		outPath = path.Replace("pptx", "pdf");
		// 		presentation.Save(outPath);
		// 	}
		//
		// 	return outPath;
		// }

		public int AddOrUpdateMaterial1(LessonMaterial lessonMaterial, int lessonId, IFormFile file, string offset, string fileName)
		{
			var bytes = FileHelper.GetBytes(file);
			var path = GetPath(lessonId, fileName);
			FileHelper.AppendContent(bytes, path, int.Parse(offset));
			lessonMaterial.Path = path;
			var materialId = _lessonRepository.AddOrUpdateMaterial(lessonMaterial, lessonId);

			return materialId;
		}

		public void DeleteMaterial(int materialId)
		{
			var lessonMaterial = _lessonRepository.GetLessonMaterial(materialId);
			var path = lessonMaterial.Path;
			_garbageRepository.FileToDelete(path);
			/* надо сделать какое-то более умное удаление, а то сейчас у тебя удаляется даже если файл ещё где то юзается
			 using (var stream = File.Open(path, FileMode.Open, FileAccess.Read, FileShare.Read))
			{
				if (File.Exists(path))
				{
					stream.Dispose();
					File.Delete(path);
				}
			}*/
			_lessonRepository.DeleteMaterial(materialId);
		}

		public void DeleteMaterial(int lessonId, IFormFile file)
		{
			var path = GetPath(lessonId, file.FileName);
			if (File.Exists(path))
			{
				File.Delete(path);
			}
		}

		public void UpdateLessons(List<Lesson> lessons, int courseId)
		{
			_lessonRepository.UpdateLessons(lessons, courseId);
		}

		private string GetPath(int lessonId, string fileName)
		{
			var path = "";
			if (fileName.Contains("jpg") || fileName.Contains("jpeg") || fileName.Contains("png"))
			{
				path = PathHelper.GetLessonImagePath(lessonId);
			}
			else if (fileName.Contains("pptx"))
			{
				path = PathHelper.GetTempPath();
			}
			else
			{
				path = PathHelper.GetLessonMaterialPath(lessonId);
			}
			path = $"{path}/{fileName}";

			return path;
		}
	}
}