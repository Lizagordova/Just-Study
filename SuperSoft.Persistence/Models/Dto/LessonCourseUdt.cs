using System;

namespace SuperSoft.Persistence.Models.Dto
{
	public class LessonCourseUdt
	{
		public int LessonId { get; set; }
		public int CourseId { get; set; }
		public int Order { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime ExpireDate { get; set; }
	}
}