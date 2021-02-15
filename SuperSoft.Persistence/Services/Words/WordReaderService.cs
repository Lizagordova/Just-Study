using System;
using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Words;
using SuperSoft.Persistence.Extensions;

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

		public List<UserWord> GetAnswersToWordOfADayByUser(int userId, int courseId)
		{
			var userWords =  _wordRepository.GetAnswersToWordOfADayByUser(userId, courseId);

			return userWords;
		}

		public List<UserWord> GetAnswersToWordOfADayByWord(int wordId, int courseId)
		{
			return _wordRepository.GetAnswersToWordOfADayByWord(wordId, courseId);
		}

		public Word GetWordOfADay(DateTime date, int courseId)
		{
			date = date.GetDayFromDate();
			var word =  _wordRepository.GetWordOfADay(date, courseId);

			return word;
		}

		public UserWord GetUserWordProgress(int userId, int wordId)
		{
			return _wordRepository.GetUserWordProgress(userId, wordId);
		}
	}
}