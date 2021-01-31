using System;
using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services.Words
{
	public class WordReaderService : IWordReaderService
	{
		private readonly IWordRepository _wordRepository;

		public WordReaderService(
			IWordRepository wordRepository)
		{
			_wordRepository = wordRepository;
		}

		public List<Word> GetDictionary()
		{
			return _wordRepository.GetDictionary();
		}

		public List<UserWord> GetUserDictionary(int userId)
		{
			return _wordRepository.GetUserDictionary(userId);
		}

		public List<UserWord> GetAnswersToWordOfADayByUser(int userId)
		{
			return _wordRepository.GetAnswersToWordOfADayByUser(userId);
		}

		public List<UserWord> GetAnswersToWordOfADayByWord(int wordId)
		{
			return _wordRepository.GetAnswersToWordOfADayByWord(wordId);
		}

		public Word GetWordOfADay(DateTime date, int courseId)
		{
			return _wordRepository.GetWordOfADay(date, courseId);
		}

		public UserWord GetUserWordProgress(int userId, int wordId)
		{
			return _wordRepository.GetUserWordProgress(userId, wordId);
		}
	}
}