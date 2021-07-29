using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services.Words;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class WordController : Controller
	{
		private readonly IWordReaderService _wordReader;
		private readonly IWordEditorService _wordEditor;
		private readonly ILogger<WordController> _logger;
		private readonly LogService _logService;
		private readonly MapperService _mapper;

		public WordController(
			IWordEditorService wordEditor,
			IWordReaderService wordReader,
			MapperService mapper,
			ILogger<WordController> logger,
			LogService logService)
		{
			_wordEditor = wordEditor;
			_wordReader = wordReader;
			_mapper = mapper;
			_logService = logService;
			_logger = logger;
		}

		[HttpGet]
		[Authorize]
		[Route("/getdictionary")]
		public ActionResult GetDictionary()
		{
			List<Word> words;
			try
			{
				words = _wordReader.GetDictionary();
			}
			catch (Exception e)
			{
				_logService.AddLogGetDictionaryException(_logger, e);

				return new StatusCodeResult(500);
			}

			var wordViewModels = words.Select(MapWordViewModel).ToList();

			return new JsonResult(wordViewModels);
		}

		[HttpPost]
		[Authorize]
		[Route("/getuserdictionary")]
		public ActionResult GetUserDictionary([FromBody]UserReadModel userReadModel)
		{
			try
			{
				var userWords = _wordReader.GetUserDictionary(userReadModel.Id);
				var wordViewModels = userWords.Select(_mapper.Map<UserWord, UserWordViewModel>).ToList();

				return new JsonResult(wordViewModels);
			}
			catch (Exception e)
			{
				_logService.AddLogGetUserDictionaryException(_logger, e, userReadModel.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "Admin")]
		[Route("/addorupdatewordtodictionary")]
		public ActionResult AddOrUpdateWordToDictionary([FromBody]WordReadModel wordReadModel)
		{
			var word = MapWord(wordReadModel);
			try
			{
				_wordEditor.AddOrUpdateWordToDictionary(word);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateWordToDictionaryException(_logger, e);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize]
		[Route("/addorupdatewordtouserdictionary")]
		public ActionResult AddOrUpdateWordToUserDictionary([FromBody]UserWordReadModel userWordReadModel)
		{
			var word = MapWord(userWordReadModel.Word);
			try
			{
				_wordEditor.AddOrUpdateWordToUserDictionary(word, userWordReadModel.UserId);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateWordToUserDictionaryException(_logger, e, userWordReadModel.UserId);

				return new StatusCodeResult(500);
			}
		}
		
		[HttpPost]
		[Authorize(Roles = "Admin")]
		[Route("/deletewordfromdictionary")]
		public ActionResult DeleteWordFromDictionary([FromBody]WordReadModel wordReadModel)
		{
			try
			{
				_wordEditor.DeleteWordFromDictionary(wordReadModel.Id);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogDeleteWordFromDictionaryException(_logger, e, wordReadModel.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize]
		[Route("/deletewordfromuserdictionary")]
		public ActionResult DeleteWordFromUserDictionary([FromBody]UserWordReadModel userWordReadModel)
		{
			try
			{
				_wordEditor.DeleteWordFromUserDictionary(userWordReadModel.Word.Id, userWordReadModel.UserId);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogDeleteWordFromUserDictionaryException(_logger, e, userWordReadModel.Word.Id, userWordReadModel.UserId);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize]
		[Route("/addorupdateuserwordprogress")]
		public ActionResult AddOrUpdateUserWordProgress([FromBody]UserWordReadModel userWordReadModel)
		{
			var userWord = _mapper.Map<UserWordReadModel, UserWord>(userWordReadModel);
			try
			{
				_wordEditor.AddOrUpdateUserWord(userWord);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateUserWordProgressException(_logger, e);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "User")]
		[Route("/addorupdateuserwordsprogress")]
		public ActionResult AddOrUpdateWordProgress([FromBody]UserWordsCollectionReadModel wordTrainingReadModel)
		{
			var userWords = wordTrainingReadModel.UserWords.Select(_mapper.Map<UserWordReadModel, UserWord>).ToList();
			try
			{
				_wordEditor.AddOrUpdateUserWords(userWords);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateUserWordProgressException(_logger, e);

				return new StatusCodeResult(500);
			}
		}
		
		[HttpPost]
		[Authorize(Roles = "Admin")]
		[Route("/deletewordofaday")]
		public ActionResult DeleteWordOfADay([FromBody]WordReadModel wordReadModel)
		{
			try
			{
				_wordEditor.DeleteWordOfADay(wordReadModel.Id);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogDeleteWordOfADayException(_logger, e, wordReadModel.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize]
		[Route("/getwordofaday")]
		public ActionResult GetWordOfADay([FromBody]WordOfADayReadModel wordReadModel)
		{
			//todo:дату без времени прокидывать!!!
			try
			{
				var word = _wordReader.GetWordOfADay(wordReadModel.Date, wordReadModel.CourseId);
				var wordViewModel = MapWordViewModel(word);

				return new JsonResult(wordViewModel);
			}
			catch (Exception e)
			{
				_logService.AddLogGetWordOfADayException(_logger, e, wordReadModel.Date, wordReadModel.CourseId);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "Admin")]
		[Route("/addorupdatewordofaday")]
		public ActionResult AddOrUpdateWordOfADay([FromBody]WordOfADayReadModel wordOfADay)
		{
			var word = MapWord(wordOfADay.Word);
			try
			{
				word.Id = _wordEditor.AddOrUpdateWordOfDay(word, wordOfADay.Date, wordOfADay.CourseId);
				var wordViewModel = MapWordViewModel(word);

				return new JsonResult(wordViewModel);
			}
			catch (Exception e)
			{
				_wordEditor.DeleteWordFromDictionary(word.Id);
				_logService.AddLogAddOrUpdateWordOfADayException(_logger, e, wordOfADay.Date, wordOfADay.CourseId);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize]
		[Route("/getuserwordsprogress")]
		public ActionResult GetUserWordsProgress([FromBody]UserWordReadModel userWordReadModel)
		{
			try
			{
				var userWord = _wordReader.GetUserWordProgress(userWordReadModel.UserId, userWordReadModel.Word.Id);
				var userWordViewModel = _mapper.Map<UserWord, UserWordViewModel>(userWord);

				return new JsonResult(userWordViewModel);
			}
			catch (Exception e)
			{
				_logService.AddLogGetUserWordProgressException(_logger, e, userWordReadModel.UserId, userWordReadModel.Word.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "Admin")]
		[Route("/getanswerstowordofadaybyword")]
		public ActionResult GetAnswersToWordOfADayByWord([FromBody]WordReadModel wordReadModel)
		{
			try
			{
				var userWords = _wordReader.GetAnswersToWordOfADayByWord(wordReadModel.Id, wordReadModel.CourseId);
				var userWordsViewModel = userWords.Select(_mapper.Map<UserWord, UserWordViewModel>).ToList();

				return new JsonResult(userWordsViewModel);
			}
			catch (Exception e)
			{
				_logService.AddLogGetAnswersToWordOfADayByWordException(_logger, e, wordReadModel.Id);

				return new StatusCodeResult(500);
			}
		}
		
		[HttpPost]
		[Authorize(Roles = "User")]
		[Route("/addorupdateuserword")]
		public ActionResult AddOrUpdateUserWord([FromBody]UserWordReadModel userWordReadModel)
		{
			var userWord = _mapper.Map<UserWordReadModel, UserWord>(userWordReadModel);
			try
			{
				_wordEditor.AddOrUpdateUserWord(userWord);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateUserWordException(_logger, e);

				return new StatusCodeResult(500);
			}
		}

		private Word MapWord(WordReadModel wordReadModel)
		{
			var word = _mapper.Map<WordReadModel, Word>(wordReadModel);
			word.Examples = wordReadModel.Examples.Select(_mapper.Map<ExampleReadModel, Example>).ToList();

			return word;
		}

		private WordViewModel MapWordViewModel(Word word)
		{
			var wordViewModel = _mapper.Map<Word, WordViewModel>(word);
			wordViewModel.Examples = word.Examples.Select(_mapper.Map<Example, ExampleViewModel>).ToList();

			return wordViewModel;
		}
	}
}