using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models.Data;
using SuperSoft.Persistence.Models.Dto;
using SuperSoft.Persistence.Services.MapperService;

namespace SuperSoft.Persistence.Repositories
{
	public class CommentRepository : ICommentRepository
	{
		private readonly MapperService _mapper;
		private const string GetCommentGroupSp = "CommentRepository_GetCommentGroup";
		private const string GetCommentsSp = "CommentRepository_GetComments";
		private const string AddOrUpdateCommentSp = "CommentRepository_AddOrUpdateComment";
		private const string AddOrUpdateCommentGroupSp = "CommentRepository_AddOrUpdateCommentGroup";
		private const string RemoveCommentSp = "CommentRepository_RemoveComment";

		public CommentRepository(MapperService mapper)
		{
			_mapper = mapper;
		}

		public int AddOrUpdateComment(Comment comment, int groupId)
		{
			var param = GetAddOrUpdateCommentParam(comment, groupId);
			var conn = DatabaseHelper.OpenConnection();
			var commentId = conn.Query<int>(AddOrUpdateCommentSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return commentId;
		}

		public int AddOrUpdateCommentGroup(CommentGroup group)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetCommentGroupParam(group);
			var groupId = conn.Query<int>(AddOrUpdateCommentGroupSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return groupId;
		}

		public void RemoveComment(int commentId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetRemoveCommentParam(commentId);
			conn.Query(RemoveCommentSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public CommentGroup GetCommentGroup(CommentGroup group)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetCommentGroupParam(group);
			group.Id = conn.Query<int>(GetCommentGroupSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return group;
		}

		public List<Comment> GetComments(int groupId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetCommentGroupParam(groupId);
			var commentsUdt = conn.Query<CommentUdt>(GetCommentsSp, param, commandType: CommandType.StoredProcedure);
			var comments = commentsUdt.Select(_mapper.Map<CommentUdt, Comment>).ToList();
			DatabaseHelper.CloseConnection(conn);

			return comments;
		}

		private DynamicTvpParameters GetAddOrUpdateCommentParam(Comment comment, int groupId)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("comment", "UDT_Comment");
			var udt = _mapper.Map<Comment, CommentUdt>(comment);
			udt.GroupId = groupId;
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}

		private DynamicTvpParameters GetCommentGroupParam(CommentGroup group)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("group", "UDT_CommentGroup");
			var udt = _mapper.Map<CommentGroup, CommentGroupUdt>(group);
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}

		private DynamicTvpParameters GetRemoveCommentParam(int commentId)
		{
			var param = new DynamicTvpParameters();
			param.Add("commentId", commentId);

			return param;
		}

		private DynamicTvpParameters GetCommentGroupParam(int groupId)
		{
			var param = new DynamicTvpParameters();
			param.Add("groupId", groupId);

			return param;
		}

		private CommentGroupData GetCommentGroupData(SqlMapper.GridReader reader)
		{
			var data = new CommentGroupData
			{
				CommentGroup = reader.Read<CommentGroupUdt>().FirstOrDefault(),
				Comments = reader.Read<CommentUdt>().ToList()
			};

			return data;
		}

		private CommentGroup MapCommentGroup(CommentGroupData data)
		{
			var commentGroup = _mapper.Map<CommentGroupUdt, CommentGroup>(data.CommentGroup);
			commentGroup.Comments = data.Comments.Select(_mapper.Map<CommentUdt, Comment>).ToList();

			return commentGroup;
		}
	}
}