using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Notifications;

namespace SuperSoft.Persistence.Services.Notifications
{
	public class NotificationReaderService : INotificationReaderService
	{
		private readonly INotificationRepository _notificationRepository;

		public NotificationReaderService(
			INotificationRepository notificationRepository)
		{
			_notificationRepository = notificationRepository;
		}

		public List<Notification> GetNotifications(int userId)
		{
			var notifications = _notificationRepository.GetNotifications(userId);

			return notifications;
		}
	}
}