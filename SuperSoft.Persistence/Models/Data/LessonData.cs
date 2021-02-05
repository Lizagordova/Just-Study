using System.Collections.Generic;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Models.Data
{
	public class LessonData
	{
		public List<LessonUdt> Lessons { get; set; }
		public List<LessonCourseUdt> LessonsCourses { get; set; }
	}
}