using SuperSoft.Domain.enums;

namespace SuperSoft.Domain.Models
{
	public class ProjectUser
	{
		public Project Project { get; set; }
		public User User { get; set; }
		public ProjectRole Role { get; set; }
	}
}