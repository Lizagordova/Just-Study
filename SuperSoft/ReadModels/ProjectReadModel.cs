using System;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class ProjectReadModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime DeadlineDate { get; set; }
	}
}