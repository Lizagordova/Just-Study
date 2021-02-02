using System.Collections.Generic;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Models.Data
{
	public class TrackerData
	{
		public TrackerUdt Tracker { get; set; }
		public List<TrackerByDayUdt> TrackersByDay { get; set; }
	}
}