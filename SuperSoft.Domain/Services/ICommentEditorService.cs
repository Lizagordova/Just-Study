using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface ICommentEditorService
	{
		int AddOrUpdateComment(Comment comment, int groupId);
		int AddOrUpdateCommentGroup(CommentGroup group);
		void RemoveComment(int commentId);
	}
}