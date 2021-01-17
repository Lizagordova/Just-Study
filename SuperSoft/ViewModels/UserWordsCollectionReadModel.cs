using System;
using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.ReadModels;

namespace SuperSoft.ViewModels
{
	[ApiReadModel]
	public class UserWordsCollectionReadModel
	{
		public IReadOnlyCollection<UserWordReadModel> UserWords { get; set; } = Array.Empty<UserWordReadModel>();
	}
}