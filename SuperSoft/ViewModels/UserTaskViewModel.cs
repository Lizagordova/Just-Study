using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class UserTaskViewModel
	{
		public UserViewModel User { get; set; }
		public TaskViewModel Task { get; set; }
		public TaskRole Role { get; set; }
	}
}