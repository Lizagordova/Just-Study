using System;

namespace SuperSoft.Persistence.Models
{
	public class TaskUdt
	{
		public int Id { get; set; }
		public string Header { get; set; }
		public string Description { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime DeadlineDate { get; set; }
		public int TaskType { get; set; }
		public int Status { get; set; }
	}
}