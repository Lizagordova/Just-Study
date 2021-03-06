using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services.Tags;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class TagController : Controller 
	{
		private readonly MapperService _mapper;
		private readonly ILogger<TagController> _logger;
		private readonly ITagReaderService _tagReader;
		private readonly ITagEditorService _tagEditor;
		private readonly LogService _logService;

		public TagController(
			MapperService mapper,
			ILogger<TagController> logger,
			ITagReaderService tagReader,
			ITagEditorService tagEditor,
			LogService logService)
		{
			_mapper = mapper;
			_logger = logger;
			_logService = logService;
			_tagEditor = tagEditor;
			_tagReader = tagReader;
		}

		[HttpGet]
		[Route("/gettags")]
		public ActionResult GetTags()
		{
			try
			{
				var tags = _tagReader.GetTags();
				var tagViewModels = tags.Select(_mapper.Map<Tag, TagViewModel>).ToList();

				return new JsonResult(tagViewModels);
			}
			catch (Exception e)
			{
				_logService.AddLogGetTagsException(_logger, e);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/deletetag")]
		public ActionResult GetTasksByChoosenLesson([FromBody]TagReadModel tagReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			try
			{
				_tagEditor.DeleteTag(tagReadModel.Id);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogDeleteTagException(_logger, e, tagReadModel.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/addorupdatetag")]
		public ActionResult AddOrUpdateTag([FromBody]TagReadModel tagReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			var tag = _mapper.Map<TagReadModel, Tag>(tagReadModel);
			try
			{
				_tagEditor.AddOrUpdateTag(tag);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateTagException(_logger, e);

				return new StatusCodeResult(500);
			}
		}
	}
}