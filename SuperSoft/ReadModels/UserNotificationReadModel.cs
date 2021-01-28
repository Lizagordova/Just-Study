using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class UserNotificationReadModel
	{
		public int UserId { get; set; }
		public int NotificationId { get; set; }
		public bool Seen { get; set; }
	}
}