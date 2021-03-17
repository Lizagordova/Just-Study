using System;
using System.Collections.Generic;

namespace SuperSoft.Domain.Queries
{
	public class TrainingTaskQuery
	{
		public IReadOnlyCollection<int> TagIds { get; set; } = Array.Empty<int>();
		public IReadOnlyCollection<int> SubtagIds { get; set; } = Array.Empty<int>();
		public IReadOnlyCollection<int> IgnoreIds { get; set; } = Array.Empty<int>();
	}
}