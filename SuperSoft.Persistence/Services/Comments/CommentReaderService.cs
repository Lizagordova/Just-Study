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
			group = _commentRepository.GetCommentGroup(group);//todo: мб тоже потенциальной проблемой, так как group.Id может быть null
			if (group.Id == 0)
			{
				group.Id = _commentRepository.AddOrUpdateCommentGroup(group);
			}
			group.Comments = _commentRepository.GetComments(group.Id);

			return group;
		}
	}
}