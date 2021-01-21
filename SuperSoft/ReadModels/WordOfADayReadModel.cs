using System;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class WordOfADayReadModel
	{
		public DateTime Date { get; set; }
		public WordReadModel Word { get; set; }
		public int CourseId { get; set; }
	}
}