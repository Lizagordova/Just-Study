using System;
using System.Collections.Generic;
using NUnit.Framework;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Persistence.Repositories;
using SuperSoft.Persistence.Services.MapperService;

namespace Tests.RepositoriesTests
{
	[TestFixture]
	public class WordRepositoryTest
	{
		private readonly WordRepository _wordRepository;
		public WordRepositoryTest()
		{
			var mapperService = new MapperService();
			_wordRepository = new WordRepository(mapperService);
		}

		[Test]
		public void AddOrUpdateWord_Expected_Result()
		{
			var word = new Word
			{
				WordText = "elbow",
				RussianMeaning = "локоть",
				EnglishMeaning = "the part in the middle of your arm where it bends",
				PartOfSpeech = PartOfSpeech.Noun
			};
			var examples = new List<Example>()
			{
				new Example() {ExampleText = "Joe threw him an elbow."},
				new Example() {ExampleText = "Rommie grabbed him by the elbow."},
			};
			word.Examples = examples;
			word.Id = _wordRepository.AddOrUpdateWordToDictionary(word);
			word.EnglishMeaning = "the part.";
			var wordId = _wordRepository.AddOrUpdateWordToDictionary(word);
			GetDictionary();
			var succeed = word.Id == wordId;
			GetDictionary();
			Assert.That(succeed == true);
		}

		[Test]
		public void DeleteWordFromDictionary()
		{
			_wordRepository.DeleteWordFromDictionary(6);
			_wordRepository.DeleteWordFromDictionary(7);
		}

		private void GetDictionary()
		{
			var words = _wordRepository.GetDictionary();
			Console.WriteLine("========DICTIONARY========");
			foreach (var word in words)
			{
				Console.WriteLine($"id={word.Id}, word={word.WordText}, russianMeaning={word.RussianMeaning}, englishMeaning={word.EnglishMeaning}, partOfSpeech={word.PartOfSpeech}");
				foreach (var example in word.Examples)
				{
					Console.WriteLine($"{example.Id} {example.ExampleText}");
				}
				Console.WriteLine("============================");
			}
		}
	}
}