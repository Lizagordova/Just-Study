using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services
{
	public class CommentReaderService : ICommentReaderService
	{
		private readonly ICommentRepository _commentRepository;

		public CommentReaderService(ICommentRepository commentRepository)
		{
			_commentRepository = commentRepository;
		}

		public CommentGroup GetCommentGroup(int taskId)
		{
			throw new System.NotImplementedException();
		}
	}
}