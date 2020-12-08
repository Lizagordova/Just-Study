using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class ProjectTaskViewModel
	{
		public ProjectViewModel Project { get; set; }
		public TaskViewModel Task { get; set; }
	}
}