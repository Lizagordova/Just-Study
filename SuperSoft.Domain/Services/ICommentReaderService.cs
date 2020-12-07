using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface ICommentReaderService
	{
		CommentGroup GetCommentGroup(int taskId);
	}
}