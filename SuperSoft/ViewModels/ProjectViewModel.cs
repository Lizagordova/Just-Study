using System;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class ProjectViewModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime DeadlineDate { get; set; }
	}
}