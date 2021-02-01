using System;
using System.Collections.Generic;

namespace SuperSoft.Domain.Queries
{
	public class CoursesInfoQuery
	{
		public IReadOnlyCollection<int> CoursesIds { get; set; } = Array.Empty<int>();
	}
}