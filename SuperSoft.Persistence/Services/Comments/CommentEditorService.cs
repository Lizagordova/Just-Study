using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Comments;

namespace SuperSoft.Persistence.Services.Comments
{
	public class CommentEditorService : ICommentEditorService
	{
		private readonly ICommentRepository _commentRepository;

		public CommentEditorService(
			ICommentRepository commentRepository)
		{
			_commentRepository = commentRepository;
		}

		public int AddOrUpdateComment(Comment comment, int groupId)
		{
			var commentId = _commentRepository.AddOrUpdateComment(comment, groupId);

			return commentId;
		}

		public int AddOrUpdateCommentGroup(CommentGroup group)
		{
			var groupId = _commentRepository.AddOrUpdateCommentGroup(group);

			return groupId;
		}

		public void RemoveComment(int commentId)
		{
			_commentRepository.RemoveComment(commentId);
		}
	}
}