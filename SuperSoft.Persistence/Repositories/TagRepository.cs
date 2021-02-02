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
	public class TagRepository : ITagRepository
	{
		private readonly MapperService _mapper;
		private const string GetTagsSp = "TagRepository_GetTags";

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
	}
}