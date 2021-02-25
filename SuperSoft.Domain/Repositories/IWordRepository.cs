using System;
using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface IWordRepository
	{
		int AddOrUpdateWordToDictionary(Word word);
		void AddOrUpdateUserWord(UserWord userWord);
		void DeleteWordFromDictionary(int wordId);
		void DeleteWordFromUserDictionary(int wordId, int userId);
		void AddOrUpdateWordOfDay(int wordId, DateTime date, int courseId);
		void DeleteWordOfADay(int wordId);
		List<Word> GetDictionary();
		List<UserWord> GetUserDictionary(int userId);
		List<UserWord> GetAnswersToWordOfADayByUser(int userId, int courseId);
		List<UserWord> GetAnswersToWordOfADayByWord(int wordId, int courseId);
		Word GetWordOfADay(DateTime date, int courseId);
		UserWord GetUserWordProgress(int userId, int wordId);
		DateTime GetDateOfWordOfADayByWordId(int wordId);
	}
}