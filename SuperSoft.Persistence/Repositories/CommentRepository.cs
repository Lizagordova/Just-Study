using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;

namespace SuperSoft.Persistence.Repositories
{
	public class CommentRepository : ICommentRepository
	{
		public CommentGroup GetCommentGroup(int taskId)
		{
			throw new System.NotImplementedException();
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