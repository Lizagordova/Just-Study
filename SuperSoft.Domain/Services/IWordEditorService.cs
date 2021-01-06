using System;
using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface IWordEditorService
	{
		int AddOrUpdateWord(Word word);
		void AddOrUpdateUserWord(UserWord userWord);
		void AddOrUpdateUserWords(List<UserWord> userWords);
		void DeleteWordFromDictionary(int wordId);
		void DeleteWordFromUserDictionary(int wordId);
		int AddOrUpdateWordOfDay(Word word, DateTime date, int courseId);
		void DeleteWordOfADay(int wordId);
	}
}