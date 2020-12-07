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
			throw new System.NotImplementedException();
		}

		public int AddOrUpdateComment(int groupId, Comment comment)
		{
			throw new System.NotImplementedException();
		}
	}
}