using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class CommentController : Controller
	{
		private readonly MapperService _mapperService;
		private readonly NotificationService _notificationService;
		private readonly ICommentReaderService _commentReader;
		private readonly ICommentEditorService _commentEditor;
		private readonly LogService _logService;
		private readonly ILogger<CommentController> _logger;

		public CommentController(
			MapperService mapperService,
			NotificationService notificationService,
			ICommentReaderService commentReader,
			ICommentEditorService commentEditor,
			LogService logService,
			ILogger<CommentController> logger
		)
		{
			_mapperService = mapperService;
			_notificationService = notificationService;
			_commentReader = commentReader;
			_commentEditor = commentEditor;
			_logService = logService;
			_logger = logger;
		}

		[HttpPost]
		[Route("/addorupdatecomment")]
		public ActionResult AddOrUpdateComment([FromBody]CommentGroupReadModel commentGroup)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if(role == null)
			{
				return new BadRequestResult();
			}
			var comment = _mapperService.Map<CommentReadModel, Comment>(commentGroup.Comment);
			var group = _mapperService.Map<CommentGroupReadModel, CommentGroup>(commentGroup);
			var groupId = 0;
			try
			{
				groupId = _commentEditor.AddOrUpdateCommentGroup(group);
				_commentEditor.AddOrUpdateComment(comment, groupId);
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateCommentException(_logger, e, comment, groupId);
				
				return new StatusCodeResult(500);
			}
			try
			{
				_notificationService.AddOrUpdateNotification(group.CommentedEntityType, createdBy: comment.UserId, group.CommentedEntityId, userForIds: new List<int>(){ group.UserId });
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateNotificationException(_logger, e);
			}

			return new OkResult();
		}

		[HttpPost]
		[Route("/getcommentgroup")]
		public ActionResult GetCommentGroup([FromBody]CommentGroupReadModel commentGroupReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if(role == null)
			{
				return new BadRequestResult();
			}
			var group = _mapperService.Map<CommentGroupReadModel, CommentGroup>(commentGroupReadModel);
			var groupId = _commentEditor.AddOrUpdateCommentGroup(group);
			group.Id = groupId;
			try
			{
				var commentGroup = _commentReader.GetCommentGroup(group);
				var groupViewModel = _mapperService.Map<CommentGroup, CommentGroupViewModel>(group);//todo: я думаю, здесь надо маппер для comments сделать ещё

				return new JsonResult(groupViewModel);
			}
			catch (Exception e)
			{
				_logService.AddLogGetCommentGroupException(_logger, e);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/removecomment")]
		public ActionResult RemoveComment([FromBody]CommentReadModel commentReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if(role == null)
			{
				return new BadRequestResult();
			}
			_commentEditor.RemoveComment(commentReadModel.Id);

			return new OkResult();
		}
	}
}