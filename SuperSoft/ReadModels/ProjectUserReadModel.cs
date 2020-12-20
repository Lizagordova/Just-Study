using SuperSoft.Domain.enums;

namespace SuperSoft.ReadModels
{
	public class ProjectUserReadModel
	{
		public int UserId { get; set; }
		public int ProjectId { get; set; }
		public ProjectRole Role { get; set; }
	}
}