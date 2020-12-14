using SuperSoft.Domain.enums;

namespace SuperSoft.ReadModels
{
	public class ProjectUserReadModel
	{
		public UserReadModel User { get; set; }
		public ProjectReadModel Project { get; set; }
		public ProjectRole Role { get; set; }
	}
}