﻿using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Tags
{
	public interface ITagEditorService
	{
		void AddOrUpdateTag(Tag tag);
		void DeleteTag(int tagId);
		void AddOrUpdateSubtags(List<Subtag> subtags, int tagId);
		void DeleteSubtag(int subtagId);
	}
}