using System;
using SuperSoft.Domain.enums;

namespace SuperSoft.Persistence.Models.Dto
{
	public class UserCourseUdt
	{
		public int UserId { get; set; }
		public int CourseId { get; set; }
		public int Tarif { get; set; }
		public DateTime? StartDate { get; set; }
		public DateTime? ExpireDate { get; set; }
		public int CourseRole { get; set; }
	}
}