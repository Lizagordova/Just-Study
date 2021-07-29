using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services.Comments;
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
		private readonly MapHelper _mapHelper;
		private readonly LogService _logService;
		private readonly ILogger<CommentController> _logger;

		public CommentController(
			MapperService mapperService,
			NotificationService notificationService,
			ICommentReaderService commentReader,
			ICommentEditorService commentEditor,
			MapHelper mapHelper,
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
			_mapHelper = mapHelper;
		}

		[HttpPost]
		[Authorize(Roles = "User,Admin")]
		[Route("/addorupdatecomment")]
		public ActionResult AddOrUpdateComment([FromBody]CommentGroupReadModel commentGroup)
		{
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
		[Authorize(Roles = "User,Admin")]
		public ActionResult GetCommentGroup([FromBody]CommentGroupReadModel commentGroupReadModel)
		{
			var group = _mapHelper.MapCommentGroup(commentGroupReadModel);
			var groupId = _commentEditor.AddOrUpdateCommentGroup(group);
			group.Id = groupId;
			try
			{
				var commentGroup = _commentReader.GetCommentGroup(group);
				var groupViewModel = _mapHelper.MapCommentGroupViewModel(commentGroup);

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
		[Authorize(Roles = "User,Admin")]
		public ActionResult RemoveComment([FromBody]CommentReadModel commentReadModel)
		{
			_commentEditor.RemoveComment(commentReadModel.Id);

			return new OkResult();
		}
	}
}