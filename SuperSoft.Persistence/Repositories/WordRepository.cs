using System;
using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;

namespace SuperSoft.Persistence.Repositories
{
	public class WordRepository : IWordRepository
	{
		public int AddOrUpdateWordToDictionary(Word word)
		{
			throw new NotImplementedException();
		}

		public int AddOrUpdateWordToUserDictionary(Word word, int userId)
		{
			throw new NotImplementedException();
		}

		public void AddOrUpdateUserWord(UserWord userWord)
		{
			throw new NotImplementedException();
		}

		public void AddOrUpdateUserWords(List<UserWord> userWords)
		{
			throw new NotImplementedException();
		}

		public void DeleteWordFromDictionary(int wordId)
		{
			throw new NotImplementedException();
		}

		public void DeleteWordFromUserDictionary(int wordId, int userId)
		{
			throw new NotImplementedException();
		}

		public int AddOrUpdateWordOfDay(Word word, DateTime date, int courseId)
		{
			throw new NotImplementedException();
		}

		public void DeleteWordOfADay(int wordId)
		{
			throw new NotImplementedException();
		}

		public List<Word> GetDictionary()
		{
			throw new NotImplementedException();
		}

		public List<UserWord> GetUserDictionary(int userId)
		{
			throw new NotImplementedException();
		}

		public List<UserWord> GetAnswersToWordOfADayByUser(int userId)
		{
			throw new NotImplementedException();
		}

		public List<UserWord> GetAnswersToWordOfADayByWord(int wordId)
		{
			throw new NotImplementedException();
		}

		public Word GetWordOfADay(DateTime date, int courseId)
		{
			throw new NotImplementedException();
		}

		public UserWord GetUserWordProgress(int userId, int wordId)
		{
			throw new NotImplementedException();
		}
	}
}