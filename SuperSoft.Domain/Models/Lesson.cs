using System;

namespace SuperSoft.Domain.Models
{
	public class Lesson
	{
		public int Id { get; set; }
		public int Order { get; set; }
		public string Description { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime ExpireDate { get; set; }
	}
}