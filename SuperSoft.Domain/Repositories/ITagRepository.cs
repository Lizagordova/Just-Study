using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface ITagRepository
	{
		List<Tag> GetTags();
	}
}