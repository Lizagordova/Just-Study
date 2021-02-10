using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Notifications;

namespace SuperSoft.Persistence.Services.Notifications
{
	public class NotificationEditorService : INotificationEditorService
	{
		private readonly INotificationRepository _notificationRepository;

		public NotificationEditorService(
			INotificationRepository notificationRepository)
		{
			_notificationRepository = notificationRepository;
		}

		public void AddOrUpdateNotification(List<int> userForIds, Notification notification)
		{
			var notificationId = _notificationRepository.AddOrUpdateNotification(notification);
			_notificationRepository.AddOrUpdateNotificationForUsers(userForIds, notificationId);
		}

		public void AddOrUpdateUserNotification(UserNotification userNotification)
		{
			_notificationRepository.AddOrUpdateUserNotification(userNotification);
		}
	}
}