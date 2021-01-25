using System;
using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class TrackerReadModel
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public int CourseId { get; set; }
		public IReadOnlyCollection<TrackerByDayReadModel> TrackersByDay { get; set; } = Array.Empty<TrackerByDayReadModel>();
	}
}