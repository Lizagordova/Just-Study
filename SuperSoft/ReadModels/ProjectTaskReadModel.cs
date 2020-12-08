using SuperSoft.Domain.enums;

namespace SuperSoft.ReadModels
{
	public class ProjectTaskReadModel
	{
		public ProjectReadModel Project { get; set; }
		public UserReadModel User { get; set; }
		public ProjectRole Role { get; set; }
	}
}