using System.Collections.Generic;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Models.Data
{
	public class TagData
	{
		public List<TagUdt> Tags { get; set; }
		public List<SubtagUdt> Subtags { get; set; }
	}
}