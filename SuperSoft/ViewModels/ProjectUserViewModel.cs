using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class ProjectUserViewModel
	{
		public ProjectViewModel Project { get; set; }
		public UserViewModel User { get; set; }
		public ProjectRole Role { get; set; }
	}
}