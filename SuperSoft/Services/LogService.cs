using System;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.ReadModels;

namespace SuperSoft.Services
{
	public class LogService
	{
		private readonly ILogRepository _logRepository;

		public LogService(
			ILogRepository logRepository)
		{
			_logRepository = logRepository;
		}

		public void AddLogGetAllWordsException(ILogger logger, Exception e)
		{
			var customMessage = "Не удалось получить словарь";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateCourseException(ILogger logger, Exception e, Course course)
		{
			var customMessage = $"Не удалось добавить курс с ID={course.Id}; NAME={course.Name}";
			AddLog(logger, e, customMessage);
		}

		public void AddLogDeleteCourseException(ILogger logger, Exception e, int courseId)
		{
			var customMessage = $"Не удалось удалить курс с ID={courseId};";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetCoursesForTeacherException(ILogger logger, Exception e, int userId)
		{
			var customMessage = $"Не удалось получить курсы для администратора с userId: {userId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetUserCoursesException(ILogger logger, Exception e, int userId)
		{
			var customMessage = $"Не удалось получить курсы для пользователя с userId: {userId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetUsersByCourseException(ILogger logger, Exception e, int courseId)
		{
			var customMessage = $"Не удалось получить пользователей для курса с courseId: {courseId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetLessonsByCourseException(ILogger logger, Exception e, int courseId)
		{
			var customMessage = $"Не удалось получить уроки для курса с courseId: {courseId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateLessonException(ILogger logger, Exception e, Lesson lesson, int courseId)
		{
			var customMessage = $"Не удалось получить добавить урок {lesson.Id} {lesson.Order} {lesson.Description} {courseId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogDeleteLessonException(ILogger logger, Exception e, int lessonId)
		{
			var customMessage = $"Не удалось удалить урок с {lessonId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetMaterialsByLessonException(ILogger logger, Exception e, int lessonId)
		{
			var customMessage = $"Не удалось получить материалы урока {lessonId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogDeleteMaterialException(ILogger logger, Exception e, int materialId)
		{
			var customMessage = $"Не удалось удалить материал с ID={materialId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateMaterialException(ILogger logger, Exception e, LessonMaterial lessonMaterial)
		{
			var customMessage = $"Не удалось добавить материал {lessonMaterial.Id}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetTasksByChoosenLessonException(ILogger logger, Exception e, int lessonId)
		{
			var customMessage = $"Не удалось получить задания для урока с ID= {lessonId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetTagsException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось получить теги.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateTaskException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось добавить задание.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateSubtaskException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось добавить подзадание.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogDeleteTaskException(ILogger logger, Exception e, int taskId)
		{
			var customMessage = $"Не удалось удалить задание {taskId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogDeleteSubtaskException(ILogger logger, Exception e, int subtaskId)
		{
			var customMessage = $"Не удалось удалить подзадание {subtaskId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetUserTaskException(ILogger logger, Exception e, int taskId, int userId)
		{
			var customMessage = $"Не удалось получить пользовательский ответ на  задание {taskId} {userId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetUserSubtaskException(ILogger logger, Exception e, int subtaskId, int userId)
		{
			var customMessage = $"Не удалось получить пользовательский ответ на  подзадание {subtaskId} {userId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateUserSubtaskException(ILogger logger, Exception e, UserSubtask userSubtask, int subtaskId, int userId)
		{
			var customMessage = $"Не удалось получить обновить ответ на  подзадание userId={userId}; subtaskId={subtaskId}; userSubtask={userSubtask.Answer}.";
			AddLog(logger, e, customMessage);
		}
		
		private void AddLog(ILogger logger, Exception e, string customMessage)
		{
			logger.Log(LogLevel.Error, $"{customMessage}. Error: {e.Message}");
			_logRepository.AddLog(new Log() { Message = e.Message, CustomMessage = e.Message, LogLevel = LogLevel.Error.ToString()});
		}
	}
}