using System;

namespace SuperSoft.Domain.Models
{
	public class Notification
	{
		public int Id { get; set; }
		public int CreatedBy { get; set; }
		public string Message { get; set; }
		public DateTime Date { get; set; }
	}
}