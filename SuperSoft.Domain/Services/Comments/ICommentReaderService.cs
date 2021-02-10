using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Comments
{
	public interface ICommentReaderService
	{
		CommentGroup GetCommentGroup(CommentGroup group);
	}
}