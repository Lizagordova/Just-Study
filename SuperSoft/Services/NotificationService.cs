using System;
using System.Collections.Generic;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Services.Lessons;
using SuperSoft.Domain.Services.Notifications;
using SuperSoft.Domain.Services.Users;
using SuperSoft.Domain.Services.Words;
using SuperSoft.Persistence.Extensions;

namespace SuperSoft.Services
{
	public class NotificationService
	{
		private readonly INotificationReaderService _notificationReader;
		private readonly INotificationEditorService _notificationEditor;
		private readonly ILessonReaderService _lessonReader;
		private readonly IWordReaderService _wordReader;
		private readonly IUserReaderService _userReader;

		public NotificationService(
			INotificationReaderService notificationReader,
			INotificationEditorService notificationEditor,
			ILessonReaderService lessonReader,
			IWordReaderService wordReader,
			IUserReaderService userReader)
		{
			_notificationReader = notificationReader;
			_notificationEditor = notificationEditor;
			_userReader = userReader;
			_lessonReader = lessonReader;
			_wordReader = wordReader;
		}

		public void AddOrUpdateNotification(CommentedEntityType entityType, int createdBy, int? entityId = null, string? message = null, List<int> userForIds = null)
		{
			var notification = new Notification
			{
				Message = message ?? GenerateMessage(entityType, entityId, createdBy),
				Date = DateTime.Now,
				CreatedBy = createdBy
			};
			userForIds.Remove(createdBy);
			_notificationEditor.AddOrUpdateNotification(userForIds, notification);
		}

		private string GenerateMessage(CommentedEntityType entityType, int? entityId = null, int? createdBy = null)
		{
			var message = "";
			if (createdBy != null)
			{
				var userCreatedBy = _userReader.GetUserInfo(new UserInfoQuery() { UserId = createdBy.Value });
				message += $"{userCreatedBy.FirstName} {userCreatedBy.LastName} создал(-а) комментарий к ";
			}
			
			if (entityType == CommentedEntityType.LessonTask)
			{
				message += $"заданию";
				if (entityId != null)
				{
					var lesson = _lessonReader.GetLessonById(entityId.Value);
					message += $" в уроке {lesson.Name}";
				}
			}
			else if (entityType == CommentedEntityType.WordOfADay)
			{
				message += $"слову дня";
				if (entityId != null)
				{
					var date = _wordReader.GetDateOfWordOfADayByWordId(entityId.Value);
					message += $" в дату от {date.Date.GetDayFromDate()}";
				}
			}

			return message;
		}
	}
}