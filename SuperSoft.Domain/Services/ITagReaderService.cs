using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface ITagReaderService
	{
		List<Tag> GetTags();
	}
}