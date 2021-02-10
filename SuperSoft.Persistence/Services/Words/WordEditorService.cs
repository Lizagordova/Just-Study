using System;
using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Words;

namespace SuperSoft.Persistence.Services.Words
{
	public class WordEditorService : IWordEditorService
	{
		private readonly IWordRepository _wordRepository;

		public WordEditorService(
			IWordRepository wordRepository)
		{
			_wordRepository = wordRepository;
		}

		public int AddOrUpdateWordToDictionary(Word word)
		{
			return _wordRepository.AddOrUpdateWordToDictionary(word);
		}

		public int AddOrUpdateWordToUserDictionary(Word word, int userId)
		{
			var wordId = _wordRepository.AddOrUpdateWordToDictionary(word);
			_wordRepository.AddOrUpdateUserWord(new UserWord() { WordId = wordId, UserId = userId });

			return wordId;
		}

		public void AddOrUpdateUserWord(UserWord userWord)
		{
			_wordRepository.AddOrUpdateUserWord(userWord);
		}

		public void AddOrUpdateUserWords(List<UserWord> userWords)
		{
			userWords.ForEach(uw => _wordRepository.AddOrUpdateUserWord(uw));
		}

		public void DeleteWordFromDictionary(int wordId)
		{
			_wordRepository.DeleteWordFromDictionary(wordId);
		}

		public void DeleteWordFromUserDictionary(int wordId, int userId)
		{
			_wordRepository.DeleteWordFromUserDictionary(wordId, userId);
		}

		public int AddOrUpdateWordOfDay(Word word, DateTime date, int courseId)
		{
			var wordId = _wordRepository.AddOrUpdateWordToDictionary(word);
			_wordRepository.AddOrUpdateWordOfDay(wordId, date, courseId);

			return wordId;
		}

		public void DeleteWordOfADay(int wordId)
		{
			_wordRepository.DeleteWordOfADay(wordId);
		}
	}
}