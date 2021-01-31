using System;
using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;

namespace SuperSoft.Persistence.Repositories
{
	public class CommentRepository : ICommentRepository
	{
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

		public CommentGroup GetCommentGroup(CommentGroup @group)
		{
			throw new NotImplementedException();
		}
	}
}