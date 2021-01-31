using System;
using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface ICommentRepository
	{
		int AddOrUpdateComment(Comment comment, int groupId);
		int AddOrUpdateCommentGroup(CommentGroup group);
		void RemoveComment(int commentId);
		CommentGroup GetCommentGroup(CommentGroup group);
	}
}