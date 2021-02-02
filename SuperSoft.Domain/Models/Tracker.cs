using System;
using System.Collections.Generic;

namespace SuperSoft.Domain.Models
{
	public class Tracker
	{
		public int Id { get; set; }
		public IReadOnlyCollection<TrackerByDay> TrackersByDay { get; set; } = Array.Empty<TrackerByDay>();
	}
}