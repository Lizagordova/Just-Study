using System;
using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class TrackerViewModel
	{
		public int Id { get; set; }
		public IReadOnlyCollection<TrackerByDayViewModel> TrackersByDay { get; set; } = Array.Empty<TrackerByDayViewModel>();
	}
}