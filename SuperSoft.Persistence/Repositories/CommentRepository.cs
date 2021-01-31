using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models.Dto;
using SuperSoft.Persistence.Services.MapperService;

namespace SuperSoft.Persistence.Repositories
{
	public class CommentRepository : ICommentRepository
	{
		private readonly MapperService _mapper;
		private const string GetCommentGroupSp = "CommentRepository_GetCommentGroup";
		private const string AddOrUpdateCommentSp = "CommentRepository_AddOrUpdateComment";
		private const string AddOrUpdateCommentGroupSp = "CommentRepository_AddOrUpdateCommentGroup";
		private const string RemoveCommentSp = "CommentRepository_RemoveComment";

		public CommentRepository(MapperService mapper)
		{
			_mapper = mapper;
		}

		public int AddOrUpdateComment(Comment comment, int groupId)
		{
			throw new NotImplementedException();
		}

		public int AddOrUpdateCommentGroup(CommentGroup @group)
		{
			throw new NotImplementedException();
		}

		public void RemoveComment(int commentId)
		{
			throw new NotImplementedException();
		}

		public CommentGroup GetCommentGroup(CommentGroup @group)
		{
			throw new NotImplementedException();
		}
	}
}