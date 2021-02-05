using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface IWordReaderService
	{
		List<Word> GetDictionary();
		List<UserWord> GetUserDictionary(int userId);
		List<UserWord> GetAnswersToWordOfADayByUser(int userId, int courseId);
		List<UserWord> GetAnswersToWordOfADayByWord(int wordId, int courseId);
		Word GetWordOfADay(DateTime date, int courseId);
		UserWord GetUserWordProgress(int userId, int wordId);
	}
}