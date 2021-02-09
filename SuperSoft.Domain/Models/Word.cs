using System;
using System.Collections.Generic;
using SuperSoft.Domain.enums;

namespace SuperSoft.Domain.Models
{
	public class Word
	{
		public int Id { get; set; }
		public string WordText { get; set; }
		public string EnglishMeaning { get; set; }
		public string RussianMeaning { get; set; }
		public PartOfSpeech PartOfSpeech { get; set; }
		public IReadOnlyCollection<Example> Examples { get; set; } = Array.Empty<Example>();
	}
}