using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface ITagRepository
	{
		List<Tag> GetTags();
		void AddOrUpdateTag(Tag tag);
		void DeleteTag(int tagId);
		List<Subtag> GetSubtagsByTag(int tagId);
		void AddOrUpdateSubtags(List<Subtag> subtags, int tagId);
		void DeleteSubtag(int subtagId);
	}
}