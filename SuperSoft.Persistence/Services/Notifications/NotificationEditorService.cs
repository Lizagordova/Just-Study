using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

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
			_notificationRepository.AddOrUpdateNotification(userForIds, notification);
		}

		public void AddOrUpdateUserNotification(UserNotification userNotification)
		{
			_notificationRepository.AddOrUpdateUserNotification(userNotification);
		}
	}
}