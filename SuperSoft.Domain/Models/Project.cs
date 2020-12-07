using System;

namespace SuperSoft.Domain.Models
{
	public class Project
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime DeadlineDate { get; set; }
	}
}