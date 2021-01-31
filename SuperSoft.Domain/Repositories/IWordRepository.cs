﻿using System;
using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface IWordRepository
	{
		int AddOrUpdateWordToDictionary(Word word);
		int AddOrUpdateWordToUserDictionary(Word word, int userId);
		void AddOrUpdateUserWord(UserWord userWord);
		void AddOrUpdateUserWords(List<UserWord> userWords);
		void DeleteWordFromDictionary(int wordId);
		void DeleteWordFromUserDictionary(int wordId, int userId);
		int AddOrUpdateWordOfDay(Word word, DateTime date, int courseId);
		void DeleteWordOfADay(int wordId);
		List<Word> GetDictionary();
		List<UserWord> GetUserDictionary(int userId);
		List<UserWord> GetAnswersToWordOfADayByUser(int userId);
		List<UserWord> GetAnswersToWordOfADayByWord(int wordId);
		Word GetWordOfADay(DateTime date, int courseId);
		UserWord GetUserWordProgress(int userId, int wordId);
	}
}