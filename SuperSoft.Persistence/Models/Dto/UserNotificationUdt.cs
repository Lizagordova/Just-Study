namespace SuperSoft.Persistence.Models.Dto
{
	public class UserNotificationUdt
	{
		public int UserId { get; set; }
		public int NotificationId { get; set; }
		public bool Seen { get; set; }
	}
}