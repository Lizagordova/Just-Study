using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface ICommentRepository
	{
		CommentGroup GetCommentGroup(int taskId);
		int AddOrUpdateCommentGroup(int taskId);
		int AddOrUpdateComment(int groupId, Comment comment);
		void DeleteComment(int commentId);
	}
}