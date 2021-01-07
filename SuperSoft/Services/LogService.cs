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

		private void AddLog(ILogger logger, Exception e, string customMessage)
		{
			logger.Log(LogLevel.Error, $"{customMessage}. Error: {e.Message}");
			_logRepository.AddLog(new Log() { Message = e.Message, CustomMessage = e.Message, LogLevel = LogLevel.Error.ToString()});
		}
	}
}