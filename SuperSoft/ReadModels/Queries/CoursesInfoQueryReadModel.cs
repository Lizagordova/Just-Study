using System;
using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels.Queries
{
	[ApiReadModel]
	public class CoursesInfoQueryReadModel
	{
		public IReadOnlyCollection<int> CoursesIds { get; set; } = Array.Empty<int>();
	}
}