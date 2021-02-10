using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Tags
{
	public interface ITagReaderService
	{
		List<Tag> GetTags();
	}
}