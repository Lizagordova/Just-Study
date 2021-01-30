using System;

namespace SuperSoft.Persistence.Models.Dto
{
	public class NotificationUdt
	{
		public int Id { get; set; }
		public int CreatedBy { get; set; }
		public string Message { get; set; }
		public DateTime Date { get; set; }
	}
}