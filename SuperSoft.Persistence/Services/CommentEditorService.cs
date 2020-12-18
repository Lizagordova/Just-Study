using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services
{
	public class CommentEditorService : ICommentEditorService
	{
		private readonly ICommentRepository _commentRepository;
		public CommentEditorService(ICommentRepository commentRepository)
		{
			_commentRepository = commentRepository;
		}

		public int AddOrUpdateCommentGroup(int taskId)
		{
			var groupId = _commentRepository.AddOrUpdateCommentGroup(taskId);

			return groupId;
		}

		public int AddOrUpdateComment(int groupId, Comment comment)
		{
			var commentId = _commentRepository.AddOrUpdateComment(groupId, comment);

			return commentId;
		}

		public void DeleteComment(int commentId)
		{
			_commentRepository.DeleteComment(commentId);
		}
	}
}