using System;

namespace SuperSoft.Persistence.Models.Dto
{
	public class LessonUdt
	{
		public int Id { get; set; }
		public int CourseId { get; set; }
		public string Description { get; set; }
		public int Order { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime ExpireDate { get; set; }
	}
}