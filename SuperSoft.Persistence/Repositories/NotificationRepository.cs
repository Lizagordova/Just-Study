using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;

namespace SuperSoft.Persistence.Repositories
{
	public class NotificationRepository : INotificationRepository
	{
		public void AddOrUpdateNotification(List<int> userForIds, Notification notification)
		{
			throw new System.NotImplementedException();
		}

		public void AddOrUpdateUserNotification(UserNotification userNotification)
		{
			throw new System.NotImplementedException();
		}

		public List<Notification> GetNotifications(int userId)
		{
			throw new System.NotImplementedException();
		}
	}
}