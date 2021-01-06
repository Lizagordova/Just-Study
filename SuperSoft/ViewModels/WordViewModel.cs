using System;
using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class WordViewModel
	{
		public int Id { get; set; }
		public string Word { get; set; }
		public string EnglishMeaning { get; set; }
		public string RussianMeaning { get; set; }
		public string PartOfSpeech { get; set; }
		public IReadOnlyCollection<ExampleViewModel> Examples { get; set; } = Array.Empty<ExampleViewModel>();
	}
}