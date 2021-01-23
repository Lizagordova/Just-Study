using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
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
		[Route("/getdictionary")]
		public ActionResult GetDictionary()
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}
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

			var wordViewModels = words.Select(_mapper.Map<Word, WordViewModel>).ToList();

			return new JsonResult(wordViewModels);
		}

		[HttpPost]
		[Route("/getuserdictionary")]
		public ActionResult GetUserDictionary([FromBody]UserReadModel userReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}
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
		[Route("/addorupdatewordtodictionary")]
		public ActionResult AddOrUpdateWordToDictionary([FromBody]WordReadModel wordReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

			var word = _mapper.Map<WordReadModel, Word>(wordReadModel);
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
		[Route("/addorupdatewordtouserdictionary")]
		public ActionResult AddOrUpdateWordToUserDictionary([FromBody]UserWordReadModel userWordReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			var word = _mapper.Map<WordReadModel, Word>(userWordReadModel.Word);
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
		[Route("/deletewordfromdictionary")]
		public ActionResult DeleteWordFromDictionay([FromBody]WordReadModel wordReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

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
		[Route("/deletewordfromuserdictionary")]
		public ActionResult DeleteWordFromUserDictionary([FromBody]UserWordReadModel userWordReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

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
		[Route("/addorupdateuserwordprogress")]
		public ActionResult AddOrUpdateUserWordProgress([FromBody]UserWordReadModel userWordReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

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
		[Route("/addorupdateuserwordsprogress")]
		public ActionResult AddOrUpdateWordProgress([FromBody]UserWordsCollectionReadModel wordTrainingReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.User.ToString())
			{
				return new BadRequestResult();
			}
			var userId = SessionHelper.GetUserId(HttpContext);
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
		[Route("/deletewordofaday")]
		public ActionResult DeleteWordOfADay([FromBody]WordReadModel wordReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}
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
		[Route("/getwordofaday")]
		public ActionResult GetWordOfADay([FromBody]WordOfADayReadModel wordReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}
			try
			{
				_wordReader.GetWordOfADay(wordReadModel.Date, wordReadModel.CourseId);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogGetWordOfADayException(_logger, e, wordReadModel.Date, wordReadModel.CourseId);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/addorupdatewordofaday")]
		public ActionResult AddOrUpdateWordOfADay([FromBody]WordOfADayReadModel wordOfADay)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.User.ToString())
			{
				return new BadRequestResult();
			}

			var word = _mapper.Map<WordReadModel, Word>(wordOfADay.Word);
			try
			{
				word.Id = _wordEditor.AddOrUpdateWordOfDay(word, wordOfADay.Date, wordOfADay.CourseId);
				var wordViewModel = _mapper.Map<Word, WordViewModel>(word);

				return new JsonResult(wordViewModel);
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateWordOfADayException(_logger, e, wordOfADay.Date, wordOfADay.CourseId);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/getuserwordsprogress")]
		public ActionResult GetUserWordsProgress([FromBody]UserWordReadModel userWordReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

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
		[Route("/addorupdateuserword")]
		public ActionResult AddOrUpdateUserWord([FromBody]UserWordReadModel userWordReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.User.ToString())
			{
				return new BadRequestResult();
			}

			var userWord = _mapper.Map<UserWordReadModel, UserWord>(userWordReadModel);
			try
			{
				_wordEditor.AddOrUpdateUserWord(userWord);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogGetUserWordProgressException(_logger, e, userWordReadModel.UserId, userWordReadModel.Word.Id);

				return new StatusCodeResult(500);
			}
		}
	}
}