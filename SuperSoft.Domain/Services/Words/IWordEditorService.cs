﻿using System;
using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Words
{
	public interface IWordEditorService
	{
		int AddOrUpdateWordToDictionary(Word word);
		int AddOrUpdateWordToUserDictionary(Word word, int userId);
		void AddOrUpdateUserWord(UserWord userWord);
		void AddOrUpdateUserWords(List<UserWord> userWords);
		void DeleteWordFromDictionary(int wordId);
		void DeleteWordFromUserDictionary(int wordId, int userId);
		int AddOrUpdateWordOfDay(Word word, DateTime date, int courseId);
		void DeleteWordOfADay(int wordId);
	}
}