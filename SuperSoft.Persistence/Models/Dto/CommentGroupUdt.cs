using SuperSoft.Domain.enums;

namespace SuperSoft.Persistence.Models.Dto
{
	public class CommentGroupUdt
	{
		public int Id { get; set; }
		public CommentedEntityType CommentedEntityType { get; set; }
		public int CommentedEntityId { get; set; }
		public int UserId { get; set; }
	}
}