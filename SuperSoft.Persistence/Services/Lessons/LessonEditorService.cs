﻿using System;
using System.Drawing;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
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
		private readonly ILogRepository _logRepository;
		private readonly ILogger<LessonEditorService> _logger;

		public LessonEditorService(
			ILessonRepository lessonRepository,
			IGarbageRepository garbageRepository,
			ILogRepository logRepository,
			ILogger<LessonEditorService> logger
			)
		{
			_lessonRepository = lessonRepository;
			_garbageRepository = garbageRepository;
			_logRepository = logRepository;
			_logger = logger;
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
				File.Delete(lm.Path);//todo: сделать что-то более усложнённое
			});
			_lessonRepository.DeleteLesson(lessonId);
		}

		public int AddOrUpdateMaterial(LessonMaterial lessonMaterial, int lessonId, IFormFile file)
		{
			_logRepository.AddLog(new Log() { Message = "Я был здесь 4", Date = DateTime.Now });
			_logger.Log(LogLevel.Information,$"Я был здесь 4 Time={DateTime.Now}" );
			var bytes = FileHelper.GetBytes(file);
			var path = GetPath(lessonId, file.FileName);
			FileHelper.SaveContent(bytes, path);
			lessonMaterial.Path = path;
			_logger.Log(LogLevel.Information,$"Я был здесь 5 Time={DateTime.Now}" );
			_logRepository.AddLog(new Log() { Message = "Я был здесь 5", Date = DateTime.Now});
			var materialId = _lessonRepository.AddOrUpdateMaterial(lessonMaterial, lessonId);
			_logger.Log(LogLevel.Information,$"Я был здесь 6 Time={DateTime.Now}" );
			_logRepository.AddLog(new Log() { Message = "Я был здесь 6", Date = DateTime.Now});

			return materialId;
		}

		public int AddOrUpdateMaterial1(LessonMaterial lessonMaterial, int lessonId, IFormFile file, string offset, string fileName)
		{
			var bytes = FileHelper.GetBytes(file);
			var path = GetPath(lessonId, fileName);
			FileHelper.AppendContent(bytes, path, int.Parse(offset));
			lessonMaterial.Path = path;
			var materialId = _lessonRepository.AddOrUpdateMaterial(lessonMaterial, lessonId);

			return 1;
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

		private string GetPath(int lessonId, string fileName)
		{
			var path = "";
			if (fileName.Contains("jpg") || fileName.Contains("jpeg") || fileName.Contains("png"))
			{
				path = PathHelper.GetLessonImagePath(lessonId);
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