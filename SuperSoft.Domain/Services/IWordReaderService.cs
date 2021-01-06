using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface IWordReaderService
	{
		List<Word> GetAllWords();
		List<UserWord> GetUserDictionary(int userId);
		List<UserWord> GetAnswersToWordOfADayByUser(int userId);
		List<UserWord> GetAnswersToWordOfADayByWord(int wordId);
		Word GetWordOfADay(DateTime date);
		Task<List<Word>> GetAllWordsAsync();
	}
}