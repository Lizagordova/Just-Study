using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface INotificationRepository
	{
		int AddOrUpdateNotification(Notification notification);
		void AddOrUpdateNotificationForUsers(List<int> userForIds, int notification);
		void AddOrUpdateUserNotification(UserNotification userNotification);
		List<Notification> GetNotifications(int userId);
	}
}