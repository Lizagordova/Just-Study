using System.Collections.Generic;

namespace SuperSoft.Domain.Models
{
	public class Tag
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public List<Subtag> Subtags { get; set; }
	}
}