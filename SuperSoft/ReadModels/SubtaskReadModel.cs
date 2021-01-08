using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class SubtaskReadModel
	{
		public int Id { get; set; }
		public string Text { get; set; }
		public string Path { get; set; }
		public int Order { get; set; }
		public SubtaskType SubtaskType { get; set; }
	}
}