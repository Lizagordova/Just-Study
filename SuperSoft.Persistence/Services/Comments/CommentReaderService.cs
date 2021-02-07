using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services.Comments
{
	public class CommentReaderService : ICommentReaderService
	{
		private readonly ICommentRepository _commentRepository;

		public CommentReaderService(
			ICommentRepository commentRepository)
		{
			_commentRepository = commentRepository;
		}

		public CommentGroup GetCommentGroup(CommentGroup group)
		{
			var commentGroup = _commentRepository.GetCommentGroup(group);
			commentGroup.Comments = _commentRepository.GetComments(commentGroup.Id);

			return commentGroup;
		}
	}
}