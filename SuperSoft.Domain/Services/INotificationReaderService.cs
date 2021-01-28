using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface INotificationReaderService
	{
		List<Notification> GetNotifications(int userId);
	}
}