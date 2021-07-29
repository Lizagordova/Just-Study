using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.enums;
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
		private readonly MapHelper _mapHelper;

		public TagController(
			MapperService mapper,
			ILogger<TagController> logger,
			ITagReaderService tagReader,
			ITagEditorService tagEditor,
			LogService logService,
			MapHelper mapHelper
			)
		{
			_mapper = mapper;
			_logger = logger;
			_logService = logService;
			_tagEditor = tagEditor;
			_tagReader = tagReader;
			_mapHelper = mapHelper;
		}

		[HttpGet]
		[Route("/gettags")]
		public ActionResult GetTags()
		{
			try
			{
				var tags = _tagReader.GetTags();
				var tagViewModels = tags.Select(_mapHelper.MapTagViewModel).ToList();

				return new JsonResult(tagViewModels);
			}
			catch (Exception e)
			{
				_logService.AddLogGetTagsException(_logger, e);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "Admin")]
		[Route("/deletetag")]
		public ActionResult GetTasksByChoosenLesson([FromBody]TagReadModel tagReadModel)
		{
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
		[Authorize(Roles = "Admin")]
		[Route("/addorupdatetag")]
		public ActionResult AddOrUpdateTag([FromBody]TagReadModel tagReadModel)
		{
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
		
		[HttpPost]
		[Authorize(Roles = "Admin")]
		[Route("/addorupdatesubtags")]
		public ActionResult AddOrUpdateSubtags([FromBody]TagReadModel tagReadModel)
		{
			var subtags = tagReadModel.Subtags.Select(_mapper.Map<SubtagReadModel, Subtag>).ToList();
			try
			{
				_tagEditor.AddOrUpdateSubtags(subtags, tagReadModel.Id);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateSubtagsException(_logger, e);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "Admin")]
		[Route("/addorupdatesubtag")]
		public ActionResult AddOrUpdateSubtags([FromBody]SubtagReadModel subtagReadModel)
		{
			var subtag = _mapper.Map<SubtagReadModel, Subtag>(subtagReadModel);
			try
			{
				_tagEditor.AddOrUpdateSubtags(new List<Subtag>() { subtag }, subtagReadModel.TagId);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateSubtagsException(_logger, e);

				return new StatusCodeResult(500);
			}
		}
	}
}