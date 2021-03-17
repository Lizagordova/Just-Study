using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class TagViewModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public List<SubtagViewModel> Subtags { get; set; }
	}
}