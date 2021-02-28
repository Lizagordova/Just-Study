using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class TaskTagReadModel
	{
		public int TaskId { get; set; }
		public IReadOnlyCollection<int> TagIds { get; set; }
	}
}