using System;

namespace SuperSoft.Persistence.Models
{
	public class ProjectUdt
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime DeadlineDate { get; set; }
		public int Responsible { get; set; }
	}
}