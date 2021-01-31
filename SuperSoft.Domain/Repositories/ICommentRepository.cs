using System;
using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface ICommentRepository
	{
		List<Word> GetDictionary();
		List<UserWord> GetUserDictionary(int userId);
		List<UserWord> GetAnswersToWordOfADayByUser(int userId);
		List<UserWord> GetAnswersToWordOfADayByWord(int wordId);
		Word GetWordOfADay(DateTime date, int courseId);
		UserWord GetUserWordProgress(int userId, int wordId);
		CommentGroup GetCommentGroup(CommentGroup group);
	}
}