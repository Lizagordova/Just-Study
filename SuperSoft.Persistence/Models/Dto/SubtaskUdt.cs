using SuperSoft.Domain.enums;

namespace SuperSoft.Persistence.Models.Dto
{
	public class SubtaskUdt
	{
		public int Id { get; set; }
		public int TaskId { get; set; }
		public string Text { get; set; }
		public string Path { get; set; }
		public int Order { get; set; }
		public SubtaskType SubtaskType { get; set; }
	}
}