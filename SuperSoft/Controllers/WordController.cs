using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Helpers;
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
		[Route("/getallwords")]
		public ActionResult GetAllWords()
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}
			var words = new List<Word>();
			try
			{
				words = _wordReader.GetAllWords();
			}
			catch (Exception e)
			{
				_logService.AddLogGetAllWordsException(_logger, e);
			}

			var wordViewModels = words.Select(_mapper.Map<Word, WordViewModel>).ToList();

			return new JsonResult(wordViewModels);
		}
	}
}