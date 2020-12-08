using SuperSoft.Domain.enums;

namespace SuperSoft.ReadModels
{
	public class ProjectUserReadModel
	{
		public UserReadModel User { get; set; }
		public TaskReadModel Task { get; set; }
		public TaskRole Role { get; set; }
	}
}