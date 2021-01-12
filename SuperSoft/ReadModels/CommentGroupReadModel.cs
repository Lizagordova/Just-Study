using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class CommentGroupReadModel
	{
		public int Id { get; set; }
		public string CommentedEntityType { get; set; }
		public int CommentedEntityId { get; set; }
		public int UserId { get; set; }
		public CommentReadModel Comment { get; set; } = new CommentReadModel();

	}
}