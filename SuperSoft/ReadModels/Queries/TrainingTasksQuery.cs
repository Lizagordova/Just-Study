using System;
using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels.Queries
{
	[ApiReadModel]
	public class TrainingTasksQuery
	{
		public IReadOnlyCollection<int> TagIds { get; set; } = Array.Empty<int>();
	}
}