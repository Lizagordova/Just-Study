using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface ITrackerEditorService
	{
		int AddOrUpdateTracker(Tracker tracker);
	}
}