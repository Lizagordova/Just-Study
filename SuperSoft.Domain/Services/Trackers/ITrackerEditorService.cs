using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Trackers
{
	public interface ITrackerEditorService
	{
		int AddOrUpdateTracker(Tracker tracker);
	}
}