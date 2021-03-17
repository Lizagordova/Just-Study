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
	public class TagRepository : ITagRepository
	{
		private readonly MapperService _mapper;
		private const string GetTagsSp = "TagRepository_GetTags";
		private const string AddOrUpdateTagSp = "TagRepository_AddOrUpdateTag";
		private const string DeleteTagSp = "TagRepository_DeleteTag";
		private const string GetSubtagsByTagSp = "TagRepository_GetSubtagsByTag";
		private const string AddOrUpdateSubtagsSp = "TagRepository_AddOrUpdateSubtags";
		private const string DeleteSubtagSp = "TagRepository_DeleteSubtag";

		public TagRepository(
			MapperService mapper)
		{
			_mapper = mapper;
		}

		public List<Tag> GetTags()
		{
			var conn = DatabaseHelper.OpenConnection();
			var response = conn.QueryMultiple(GetTagsSp, commandType: CommandType.StoredProcedure);
			var tagData = GetTagData(response);
			var tags = MapTags(tagData);
			DatabaseHelper.CloseConnection(conn);

			return tags;
		}

		private TagData GetTagData(SqlMapper.GridReader reader)
		{
			var tagData = new TagData()
			{
				Tags = reader.Read<TagUdt>().ToList(),
				Subtags = reader.Read<SubtagUdt>().ToList()
			};

			return tagData;
		}

		private List<Tag> MapTags(TagData tagData)
		{
			var tags = tagData.Tags
				.GroupJoin(tagData.Subtags,
					t => t.Id,
					s => s.TagId,
					MapTag)
				.ToList();

			return tags;
		}

		private Tag MapTag(TagUdt tagUdt, IEnumerable<SubtagUdt> subtagUdts)
		{
			var tag = _mapper.Map<TagUdt, Tag>(tagUdt);
			tag.Subtags = subtagUdts.Select(_mapper.Map<SubtagUdt, Subtag>).ToList();

			return tag;
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

		public List<Subtag> GetSubtagsByTag(int tagId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetTagIdParam(tagId);
			var subtagUdt = conn.Query<SubtagUdt>(GetSubtagsByTagSp, param, commandType: CommandType.StoredProcedure);
			var subtags = subtagUdt.Select(_mapper.Map<SubtagUdt, Subtag>).ToList();
			DatabaseHelper.CloseConnection(conn);

			return subtags;
		}

		public void AddOrUpdateSubtags(List<Subtag> subtags, int tagId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = AddOrUpdateSubtagsParam(subtags, tagId);
			conn.Query(AddOrUpdateSubtagsSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public void DeleteSubtag(int subtagId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetSubtagIdParam(subtagId);
			conn.Query(DeleteSubtagSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		private DynamicTvpParameters GetSubtagIdParam(int subtagId)
		{
			var param = new DynamicTvpParameters();
			param.Add("subtagId", subtagId);

			return param;
		}

		private DynamicTvpParameters AddOrUpdateSubtagsParam(List<Subtag> subtags, int tagId)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("subtags", "UDT_Subtag");
			var udt = subtags.Select(_mapper.Map<Subtag, SubtagUdt>).ToList();
			tvp.AddGenericList(udt);
			param.Add(tvp);
			param.Add("tagId", tagId);

			return param;
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