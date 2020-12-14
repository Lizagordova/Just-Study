using System.Data;
using System.Linq;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models;
using SuperSoft.Persistence.Services.MapperService;
using Dapper;

namespace SuperSoft.Persistence.Repositories
{
	public class CommentRepository : ICommentRepository
	{
		private readonly MapperService _mapper;
		private const string GetCommentGroupSp = "CommentRepository_GetCommentGroup";
		private const string AddOrUpdateCommentGroupSp = "CommentRepository_AddOrUpdateCommentGroup";
		private const string AddOrUpdateCommentSp = "CommentRepository_AddOrUpdateComment";
		public CommentRepository(
			MapperService mapper)
		{
			_mapper = mapper;
		}

		public CommentGroup GetCommentGroup(int taskId)
		{
			var param = new DynamicTvpParameters();
			param.Add("taskId", taskId);
			var conn = DatabaseHelper.OpenConnection();
			var data = conn.QueryMultiple(GetCommentGroupSp, param, commandType: CommandType.StoredProcedure);
			var commentGroup = MapCommentGroup(data, taskId);
			DatabaseHelper.CloseConnection(conn);

			return commentGroup;

		}

		private CommentGroup MapCommentGroup(SqlMapper.GridReader data, int taskId)
		{
			var commentsUdt = data.Read<CommentUdt>().ToList();
			var usersUdt = data.Read<UserUdt>().ToList();
			var comments = commentsUdt
				.Join(usersUdt,
					c => c.UserId,
					u => u.Id,
					MapComment)
				.ToList();
			var commentGroup = new CommentGroup()
			{
				Id = commentsUdt.FirstOrDefault().GroupId,
				Comments = comments,
				TaskId = taskId
			};

			return commentGroup;
		}

		private Comment MapComment(CommentUdt commentUdt, UserUdt userUdt)
		{
			var comment = _mapper.Map<CommentUdt, Comment>(commentUdt);
			comment.User = _mapper.Map<UserUdt, User>(userUdt);

			return comment;
		}

		public int AddOrUpdateCommentGroup(int taskId)
		{
			var param = new DynamicTvpParameters();
			param.Add("taskId", taskId);
			var conn = DatabaseHelper.OpenConnection();
			var groupId = conn.Query<int>(AddOrUpdateCommentGroupSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();

			return groupId;
		}

		public int AddOrUpdateComment(int groupId, Comment comment)
		{
			var param = GetAddOrUpdateCommentParam(groupId, comment);
			var conn = DatabaseHelper.OpenConnection();
			var commentId = conn.Query<int>(AddOrUpdateCommentSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return commentId;
		}

		private DynamicTvpParameters GetAddOrUpdateCommentParam(int groupId, Comment comment)
		{
			var param = new DynamicTvpParameters();
			param.Add("groupId", groupId);
			var tvp = new TableValuedParameter("comment", "UDT_Comment");
			var udt = _mapper.Map<Comment, CommentUdt>(comment);
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}
	}
}