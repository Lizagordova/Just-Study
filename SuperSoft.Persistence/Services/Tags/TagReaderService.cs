using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services.Tags
{
	public class TagReaderService : ITagReaderService
	{
		private readonly ITagRepository _tagRepository;
		public TagReaderService(
			ITagRepository tagRepository)
		{
			_tagRepository = tagRepository;
		}

		public List<Tag> GetTags()
		{
			var tags = _tagRepository.GetTags();

			return tags;
		}
	}
}