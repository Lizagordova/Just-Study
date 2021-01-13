using System;
using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class WordReadModel
	{
		public int Id { get; set; }
		public string Word { get; set; }
		public string EnglishMeaning { get; set; }
		public string RussianMeaning { get; set; }
		public PartOfSpeech PartOfSpeech { get; set; }
		public IReadOnlyCollection<ExampleReadModel> Examples { get; set; } = Array.Empty<ExampleReadModel>();
	}
}