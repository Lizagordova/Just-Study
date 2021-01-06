using System;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class LessonViewModel
	{
		public int Id { get; set; }
		public int Order { get; set; }
		public string Description { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime ExpireDate { get; set; }
	}
}