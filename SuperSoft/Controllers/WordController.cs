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
	}
}