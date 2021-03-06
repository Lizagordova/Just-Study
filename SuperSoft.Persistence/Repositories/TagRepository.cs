using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models.Dto;
using SuperSoft.Persistence.Services.MapperService;

namespace SuperSoft.Persistence.Repositories
{
	public class TagRepository : ITagRepository
	{
		private readonly MapperService _mapper;
		private const string GetTagsSp = "TagRepository_GetTags";
		private const string AddOrUpdateTagSp = "TagRepository_AddOrUpdateTag";
		private const string DeleteTagSp = "TagRepository_DeleteTag";

		public TagRepository(
			MapperService mapper)
		{
			_mapper = mapper;
		}

		public List<Tag> GetTags()
		{
			var conn = DatabaseHelper.OpenConnection();
			var tagUdts = conn.Query<TagUdt>(GetTagsSp, commandType: CommandType.StoredProcedure);
			var tags = tagUdts.Select(_mapper.Map<TagUdt, Tag>).ToList();
			DatabaseHelper.CloseConnection(conn);

			return tags;
		}

		public void AddOrUpdateTag(Tag tag)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetTagParam(tag);
			conn.Query(AddOrUpdateTagSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public void DeleteTag(int tagId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetTagIdParam(tagId);
			conn.Query(DeleteTagSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		private DynamicTvpParameters GetTagParam(Tag tag)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("tag", "UDT_Tag");
			var udt = _mapper.Map<Tag, TagUdt>(tag);
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}

		private DynamicTvpParameters GetTagIdParam(int tagId)
		{
			var param = new DynamicTvpParameters();
			param.Add("tagId", tagId);

			return param;
		}
	}
}