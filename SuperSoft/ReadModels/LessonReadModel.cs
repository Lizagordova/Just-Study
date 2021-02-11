using System;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class LessonReadModel
	{
		public int Id { get; set; }
		public int Order { get; set; }
		public int CourseId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime ExpireDate { get; set; }
	}
}