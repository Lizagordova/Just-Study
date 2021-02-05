using System;
using SuperSoft.Domain.enums;

namespace SuperSoft.Domain.Models
{
	public class UserCourse
	{
		public int UserId { get; set; }
		public int CourseId { get; set; }
		public Tarif Tarif { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime ExpireDate { get; set; }
		public CourseRole CourseRole { get; set; }
	}
}