using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface ICommentEditorService
	{
		int AddOrUpdateCommentGroup(int taskId);
		int AddOrUpdateComment(int groupId, Comment comment);
		void DeleteComment(int commentId);
	}
}