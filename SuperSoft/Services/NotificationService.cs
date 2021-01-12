using System;
using System.Collections.Generic;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

namespace SuperSoft.Services
{
	public class NotificationService
	{
		private readonly INotificationReaderService _notificationReader;
		private readonly INotificationEditorService _notificationEditor;
		private readonly IUserReaderService _userReader;

		public NotificationService(
			INotificationReaderService notificationReader,
			INotificationEditorService notificationEditor,
			IUserReaderService userReader)
		{
			_notificationReader = notificationReader;
			_notificationEditor = notificationEditor;
			_userReader = userReader;
		}

		public void AddOrUpdateNotification(CommentedEntityType entityType, int createdBy, int? entityId = null, string? message = null, List<int> userForIds = null)
		{
			var notification = new Notification
			{
				Message = message ?? GenerateMessage(entityType, entityId, createdBy),
				Date = DateTime.Now,
				CreatedBy = createdBy
			};
			_notificationEditor.AddOrUpdateNotification(userForIds, notification);
		}

		private string GenerateMessage(CommentedEntityType entityType, int? entityId = null, int? createdBy = null)
		{
			var message = "";
			if (createdBy != null)
			{
				var userCreatedBy = _userReader.GetUserInfo(createdBy.Value);
				message += $"{userCreatedBy.FirstName} {userCreatedBy.LastName} создал(-а) комментарий к ";
			}
			
			if (entityType == CommentedEntityType.LessonTask)
			{
				message += $"заданию";
			}
			else if (entityType == CommentedEntityType.WordOfADay)
			{
				message += $"слову дня";
			}

			return message;
		}
	}
}