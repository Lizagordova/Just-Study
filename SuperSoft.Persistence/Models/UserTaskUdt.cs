using System;

namespace SuperSoft.Persistence.Models
{
	public class UserTaskUdt
	{
		public int UserId { get; set; }
		public int TaskId { get; set; }
		public int Role { get; set; }
		public DateTime TimeSpent { get; set; }
	}
}