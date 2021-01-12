using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface INotificationEditorService
	{
		void AddOrUpdateNotification(List<int> userForIds, Notification notification);
	}
}