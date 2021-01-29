namespace SuperSoft.Domain.Models
{
	public class UserNotification
	{
		public int UserId { get; set; }
		public int NotificationId { get; set; }
		public bool Seen { get; set; }
	}
}