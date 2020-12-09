using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class CommonViewModel
	{
		public UserViewModel User { get; set; }
		public IReadOnlyCollection<ProjectViewModel> Projects { get; set; }
		public IReadOnlyCollection<ProjectUserViewModel> ProjectUsers { get; set; }
		public IReadOnlyCollection<ProjectTaskViewModel> ProjectTasks { get; set; }
		public IReadOnlyCollection<TaskViewModel> Tasks { get; set; }
		public IReadOnlyCollection<UserTaskViewModel> UserTasks { get; set; }
		public IReadOnlyCollection<UserViewModel> Users { get; set; }
		public IReadOnlyCollection<CommentGroupViewModel> CommentGroups { get; set; }
	}
}