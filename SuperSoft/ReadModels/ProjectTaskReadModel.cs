using SuperSoft.Domain.enums;

namespace SuperSoft.ReadModels
{
	public class ProjectTaskReadModel
	{
		public ProjectReadModel Project { get; set; }
		public TaskReadModel Task { get; set; }
	}
}