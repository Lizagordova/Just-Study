using System;
using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class UserCourseReadModel
	{
		public int UserId { get; set; }
		public int CourseId { get; set; }
		public Tarif Tarif { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime ExpireDate { get; set; }
		public CourseRole CourseRole { get; set; }
	}
}