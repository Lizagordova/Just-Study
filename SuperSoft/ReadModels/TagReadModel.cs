using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class TagReadModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public List<SubtagReadModel> Subtags { get; set; }
	}
}