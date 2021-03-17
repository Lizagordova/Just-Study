using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Tags;

namespace SuperSoft.Persistence.Services.Tags
{
	public class TagEditorService : ITagEditorService
	{
		private readonly ITagRepository _tagRepository;

		public TagEditorService(
			ITagRepository tagRepository)
		{
			_tagRepository = tagRepository;
		}

		public void AddOrUpdateTag(Tag tag)
		{
			_tagRepository.AddOrUpdateTag(tag);
		}

		public void DeleteTag(int tagId)
		{
			_tagRepository.DeleteTag(tagId);
		}

		public void AddOrUpdateSubtags(List<Subtag> subtags, int tagId)
		{
			_tagRepository.AddOrUpdateSubtags(subtags, tagId);
		}

		public void DeleteSubtag(int subtagId)
		{
			_tagRepository.DeleteSubtag(subtagId);
		}
	}
}