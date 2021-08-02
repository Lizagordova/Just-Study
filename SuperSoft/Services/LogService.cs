using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Helpers;
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

		public void AddLogGetDictionaryException(ILogger logger, Exception e)
		{
			var customMessage = "Не удалось получить словарь";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetUserDictionaryException(ILogger logger, Exception e, int userId)
		{
			var customMessage = $"Не удалось получить словарь для пользователя с id={userId}";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateWordToDictionaryException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось добавить слово в словарь";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateWordToUserDictionaryException(ILogger logger, Exception e, int userId)
		{
			var customMessage = $"Не удалось добавить слово в словарь пользователя с id={userId}";
			AddLog(logger, e, customMessage);
		}

		public void AddLogDeleteWordFromDictionaryException(ILogger logger, Exception e, int wordId)
		{
			var customMessage = $"Не удалось удалить слово из словаря с wordId={wordId}";
			AddLog(logger, e, customMessage);
		}

		public void AddLogDeleteWordFromUserDictionaryException(ILogger logger, Exception e, int wordId, int userId)
		{
			var customMessage = $"Не удалось удалить слово из пользовательского словаря с wordId={wordId} и userId={userId}";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateUserWordProgressException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось обновить прогресс слов для юзера.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogDeleteWordOfADayException(ILogger logger, Exception e, int wordId)
		{
			var customMessage = $"Не удалось удалить слово дня с wordId={wordId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetWordOfADayException(ILogger logger, Exception e, DateTime date, int courseId)
		{
			var customMessage = $"Не удалось получить слово дня для courseId={courseId} на дату={date}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateWordOfADayException(ILogger logger, Exception e, DateTime date, int courseId)
		{
			var customMessage = $"Не удалось добавить или отредактировать слово дня для courseId={courseId} на дату={date}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetUserWordProgressException(ILogger logger, Exception e, int userId, int wordId)
		{
			var customMessage = $"Не удалось получить прогресс пользователя по словам для userId={userId} и wordId={wordId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateUserWordException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось добавить или обновить юзерский прогресс.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetAnswersToWordOfADayByWordException(ILogger logger, Exception e, int wordId)
		{
			var customMessage = $"Не удалось получить ответы пользователей с wordId={wordId}.";
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

		public void AddLogGetCoursesInfoException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось получить информацию о курсах.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateUserCourseDetails(ILogger logger, Exception e, int courseId, int userId)
		{
			var customMessage = $"Не удалось обновить информацию по курсу courseId={courseId} для userId={userId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogDeleteUserFromCourseDetails(ILogger logger, Exception e, int courseId, int userId)
		{
			var customMessage = $"Не удалось удалить пользователя userId={userId} с courseId={courseId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateParticipantsListException(ILogger logger, Exception e, int courseId)
		{
			var customMessage = $"Не удалось добавить или обновить лист участников курса с courseId={courseId}.";
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
			var customMessage = $"Не удалось добавить материал в {lessonMaterial.Path}";
			AddLog(logger, e, customMessage);
		}
		
		public void AddLogUpdateLessonsException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось обновить уроки";
			AddLog(logger, e, customMessage);
		}
		
		public void AddLogAddOrUpdateJustLogException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось((((";
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

		public void AddLogDeleteTagException(ILogger logger, Exception e, int tagId)
		{
			var customMessage = $"Не удалось удалить тег tagId={tagId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateTagException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось добавить тег";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateSubtagsException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось добавить подтеги";
			AddLog(logger, e, customMessage);
		}
		
		public void AddLogAddOrUpdateTaskException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось добавить задание.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAttachTaskToLessonException(ILogger logger, Exception e, int taskId, int lessonId)
		{
			var customMessage = $"Не удалось прикрепить задание taskId={taskId} к lessonId={lessonId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateSubtaskException(ILogger logger, Exception e, string text, int order)
		{
			var customMessage = $"Не удалось добавить подзадание. text={text};order={order}";
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

		public void AddLogGetTaskByIdException(ILogger logger, Exception e, int taskId)
		{
			var customMessage = $"Не удалось получить задания по taskId={taskId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAttachTagsToTaskException(ILogger logger, Exception e, int taskId)
		{
			var customMessage = $"Не удалось прикрепить тэги к заданию с taskId={taskId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAttachSubtagsToTaskException(ILogger logger, Exception e, int taskId)
		{
			var customMessage = $"Не удалось прикрепить подтеги к заданию с taskId={taskId}.";
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

		public void AddLogGetTasksException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось получить задания для тренировок.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateUserSubtaskAnswerGroupException(ILogger logger, Exception e, UserSubtaskAnswerGroup answerGroup, int subtaskId, int userId)
		{
			var customMessage = $"Не удалось получить обновить subtaskAnswerGroup userId={userId}; subtaskId={subtaskId}; userSubtask={answerGroup.LastAnswer}; answerGroupId={answerGroup.AnswerGroupId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogDeleteUserSubtaskException(ILogger logger, Exception e, int subtaskId, int userId)
		{
			var customMessage = $"Не удалось удалить UserSubtask для userId={userId}; subtaskId={subtaskId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateCommentException(ILogger logger, Exception e, Comment comment, int groupId)
		{
			var customMessage = $"Не удалось добавить комментарий text:{comment.Text};PublishDate={comment.PublishDate};UserId={comment.UserId};groupId={groupId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetCommentGroupException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось получить группу комментариев.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateNotificationException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось добавить уведомление.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateUserException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось добавить пользователя или обновить его данные";
			AddLog(logger, e, customMessage);
		}

		public void AddLogDeleteUserException(ILogger logger, Exception e, int userId)
		{
			var customMessage = $"Не удалось удалить пользователя с userId={userId}";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAuthorizationProblemException(ILogger logger, Exception e, string login)
		{
			var customMessage = $"Не удалось авторизоваться польователю c логином={login}";
			AddLog(logger, e, customMessage);
		}
		
		public void AddLogGetTrackerException(ILogger logger, Exception e, int userId, int courseId)
		{
			var customMessage = $"Не удалось получить трекер для пользователя с userId={userId} и courseId={courseId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddOrUpdateUserNotificationException(ILogger logger, Exception e, int userId, int notificationId)
		{
			var customMessage = $"Не удалось обновить userNotification с userId={userId} и notificationId={notificationId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetNotificationsException(ILogger logger, Exception e, int userId)
		{
			var customMessage = $"Не удалось получить уведомления для userId={userId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetUserCourseProgressException(ILogger logger, Exception e, int userId, int courseId)
		{
			var customMessage = $"Не удалось получить прогресс для userId={userId}, courseId={courseId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetProgressByLessonException(ILogger logger, Exception e, int lessonId)
		{
			var customMessage = $"Не удалось получить прогресс для lessonId={lessonId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetUserProgressByLessonException(ILogger logger, Exception e, int userId, int lessonId)
		{
			var customMessage = $"Не удалось получить прогресс для userId={userId} в lessonId={lessonId}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogAddFeedbackException(ILogger logger, Exception e, string email, string name, string message)
		{
			var customMessage = $"Не удалось добавить фидбек c email={email}, name={name}, message={message}.";
			AddLog(logger, e, customMessage);
		}

		public void AddLogGetFeedbacksException(ILogger logger, Exception e)
		{
			var customMessage = $"Не удалось получить фидбеки.";
			AddLog(logger, e, customMessage);
		}

		public void AddTrackLog(HttpContext context)
		{
			var message = $"Произведён вход с RemoteIpAddress=${context.Connection.RemoteIpAddress} RemotePort=${context.Connection.RemotePort}" 
			    + $"LocalIpAddress={context.Connection.LocalIpAddress} LocalPort=${context.Connection.LocalPort}"
			    + $"ClientCertificate={context.Connection.ClientCertificate}";
			_logRepository.AddLog(new Log
			{
				Message = message, CustomMessage = message, LogLevel = LogLevel.Information, Date = DateTime.Now
			});
		}
		
		private void AddLog(ILogger logger, Exception e, string customMessage)
		{
			logger.Log(LogLevel.Error, $"{customMessage}. Error: {e.Message}");
			_logRepository.AddLog(new Log
				{ Message = e.Message, CustomMessage = customMessage, LogLevel = LogLevel.Error, Date = DateTime.Now });
		}
	}
}