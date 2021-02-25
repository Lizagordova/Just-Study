using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models.Dto;
using SuperSoft.Persistence.Services.MapperService;

namespace SuperSoft.Persistence.Repositories
{
	public class WordRepository : IWordRepository
	{
		private readonly MapperService _mapper;
		private const string GetDictionarySp = "WordRepository_GetDictionary";
		private const string GetUserDictionarySp = "WordRepository_GetUserDictionary";
		private const string GetAnswersToWordOfADayByUserSp = "WordRepository_GetAnswersToWordOfADayByUser";
		private const string GetAnswersToWordOfADayByWordSp = "WordRepository_GetAnswersToWordOfADayByWord";
		private const string GetWordOfADaySp = "WordRepository_GetWordOfADay";
		private const string GetUserWordProgressSp = "WordRepository_GetUserWordProgress";
		private const string DeleteWordOfADaySp = "WordRepository_DeleteWordOfADay";
		private const string DeleteWordFromDictionarySp = "WordRepository_DeleteWordFromDictionary";
		private const string DeleteWordFromUserDictionarySp = "WordRepository_DeleteWordFromUserDictionary";
		private const string AddOrUpdateWordToDictionarySp = "WordRepository_AddOrUpdateWordToDictionary";
		private const string AddOrUpdateUserWordSp = "WordRepository_AddOrUpdateUserWord";
		private const string AddOrUpdateWordOfDaySp = "WordRepository_AddOrUpdateWordOfDay";
		private const string GetDateOfWordOfADayByWordIdSp = "WordRepository_GetDateOfWordOfADayByWordId";

		public WordRepository(MapperService mapper)
		{
			_mapper = mapper;
		}

		public int AddOrUpdateWordToDictionary(Word word)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateWordToDictionaryParam(word);
			var wordId = conn.Query<int>(AddOrUpdateWordToDictionarySp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return wordId;
		}

		public void AddOrUpdateUserWord(UserWord userWord)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateUserWordParam(userWord);
			conn.Query(AddOrUpdateUserWordSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public void DeleteWordFromDictionary(int wordId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetWordIdParam(wordId);
			conn.Query(DeleteWordFromDictionarySp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public void DeleteWordFromUserDictionary(int wordId, int userId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = new DynamicTvpParameters();
			param.Add("userId", userId);
			param.Add("wordId", wordId);
			conn.Query(DeleteWordFromUserDictionarySp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public void AddOrUpdateWordOfDay(int wordId, DateTime date, int courseId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateWordOfDayParam(wordId, date, courseId);
			conn.Query<int>(AddOrUpdateWordOfDaySp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);
		}

		public void DeleteWordOfADay(int wordId)
		{
			var param = new DynamicTvpParameters();
			param.Add("wordId", wordId);
			var conn = DatabaseHelper.OpenConnection();
			conn.Query(DeleteWordOfADaySp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public List<Word> GetDictionary()
		{
			var conn = DatabaseHelper.OpenConnection();
			var response = conn.QueryMultiple(GetDictionarySp, commandType: CommandType.StoredProcedure);
			var words = MapWordsCollection(response);
			DatabaseHelper.CloseConnection(conn);

			return words;
		}

		public List<UserWord> GetUserDictionary(int userId)
		{
			var param = GetUserParam(userId);
			var conn = DatabaseHelper.OpenConnection();
			var userWordsUdt = conn.Query<UserWordUdt>(GetUserDictionarySp, param, commandType: CommandType.StoredProcedure);
			var userWords = userWordsUdt.Select(_mapper.Map<UserWordUdt, UserWord>).ToList();
			DatabaseHelper.CloseConnection(conn);

			return userWords;
		}

		public List<UserWord> GetAnswersToWordOfADayByUser(int userId, int courseId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetUserParam(userId);
			param.Add("courseId", courseId);
			var userWordUdts = conn.Query<UserWordUdt>(GetAnswersToWordOfADayByUserSp, param, commandType: CommandType.StoredProcedure);
			var userWords = userWordUdts.Select(_mapper.Map<UserWordUdt, UserWord>).ToList();
			DatabaseHelper.CloseConnection(conn);

			return userWords;
		}

		public List<UserWord> GetAnswersToWordOfADayByWord(int wordId, int courseId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = new DynamicTvpParameters();
			param.Add("wordId", wordId);
			param.Add("courseId", courseId);
			var userWordUdts = conn.Query<UserWordUdt>(GetAnswersToWordOfADayByWordSp, param, commandType: CommandType.StoredProcedure);
			var userWords = userWordUdts.Select(_mapper.Map<UserWordUdt, UserWord>).ToList();
			DatabaseHelper.CloseConnection(conn);

			return userWords;
		}

		public Word GetWordOfADay(DateTime date, int courseId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetGetWordOfADayParam(date, courseId);
			var response = conn.QueryMultiple(GetWordOfADaySp, param, commandType: CommandType.StoredProcedure);
			var word = MapWordsCollection(response).FirstOrDefault() ?? new Word();
			DatabaseHelper.CloseConnection(conn);

			return word;
		}

		public UserWord GetUserWordProgress(int userId, int wordId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetUserWordProgressParam(userId, wordId);
			var userWordUdt = conn.Query<UserWordUdt>(GetUserWordProgressSp, param, commandType: CommandType.StoredProcedure)
				.FirstOrDefault() ??
				new UserWordUdt();
			var userWord = _mapper.Map<UserWordUdt, UserWord>(userWordUdt);
			DatabaseHelper.CloseConnection(conn);

			return userWord;
		}

		public DateTime GetDateOfWordOfADayByWordId(int wordId)//todo: это очень большая хуйня, если одно слово дня привязано к нескольким курсам
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetWordIdParam(wordId);
			var date = conn
				.Query<DateTime>(GetDateOfWordOfADayByWordIdSp, param, commandType: CommandType.StoredProcedure)
				.FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return date;
		}

		private DynamicTvpParameters GetAddOrUpdateUserWordParam(UserWord userWord)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("userWord", "UDT_User_Word");
			var userWordUdt = _mapper.Map<UserWord, UserWordUdt>(userWord);
			tvp.AddObjectAsRow(userWordUdt);
			param.Add(tvp);

			return param;
		}

		private DynamicTvpParameters GetAddOrUpdateWordToUserDictionaryParam(int wordId, int userId)
		{
			var param = new DynamicTvpParameters();
			param.Add("wordId", wordId);
			param.Add("userId", userId);

			return param;
		}

		private DynamicTvpParameters GetAddOrUpdateWordOfDayParam(int wordId, DateTime date, int courseId)
		{
			var param = new DynamicTvpParameters();
			param.Add("wordId", wordId);
			param.Add("date", date);
			param.Add("courseId", courseId);

			return param;
		}

		private DynamicTvpParameters GetGetWordOfADayParam(DateTime date, int courseId)
		{
			var param = new DynamicTvpParameters();
			param.Add("date", date);
			param.Add("courseId", courseId);

			return param;
		}

		private DynamicTvpParameters GetAddOrUpdateWordToDictionaryParam(Word word)
		{
			var param = new DynamicTvpParameters();
			var wordTvp = new TableValuedParameter("word", "UDT_Word");
			var wordUdt = _mapper.Map<Word, WordUdt>(word);
			wordTvp.AddObjectAsRow(wordUdt);
			var examplesTvp = new TableValuedParameter("examples", "UDT_Example");
			var exampleUdt = word.Examples.Select(_mapper.Map<Example, ExampleUdt>).ToList();
			examplesTvp.AddGenericList(exampleUdt);
			param.Add(wordTvp);
			param.Add(examplesTvp);

			return param;
		}

		private DynamicTvpParameters GetUserWordProgressParam(int userId, int wordId)
		{
			var param = new DynamicTvpParameters();
			param.Add("userId", userId);
			param.Add("wordId", wordId);

			return param;
		}

		private DynamicTvpParameters GetUserParam(int userId)
		{
			var param = new DynamicTvpParameters();
			param.Add("userId", userId);

			return param;
		}

		private DynamicTvpParameters GetWordIdParam(int wordId)
		{
			var param = new DynamicTvpParameters();
			param.Add("wordId", wordId);

			return param;
		}

		private List<Word> MapWordsCollection(SqlMapper.GridReader reader)
		{
			var wordsUdt = reader.Read<WordUdt>();
			var examples = reader.Read<ExampleUdt>();
			var words = wordsUdt.GroupJoin(examples,
					word => word.Id,
					example => example.WordId,
					MapWord)
				.ToList();

			return words;
		}

		private Word MapWord(WordUdt wordUdt, IEnumerable<ExampleUdt> exampleUdt)
		{
			var word = _mapper.Map<WordUdt, Word>(wordUdt);
			return word;
		}
	}
}