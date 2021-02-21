using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class CommentGroupReadModel
	{
		public int Id { get; set; }
		public CommentedEntityType CommentedEntityType { get; set; }
		public int CommentedEntityId { get; set; }
		public int UserId { get; set; }
		public CommentReadModel Comment { get; set; } = new CommentReadModel();

	}
}