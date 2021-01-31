using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface INotificationRepository
	{
		void AddOrUpdateNotification(List<int> userForIds, Notification notification);
		void AddOrUpdateUserNotification(UserNotification userNotification);
		List<Notification> GetNotifications(int userId);
	}
}