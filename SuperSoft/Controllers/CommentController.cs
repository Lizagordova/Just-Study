using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
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
		[Route("/home/courses/addorupdatecomment")]
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

		/*[HttpPost]
		[Route("/home/courses/getcommentgroup")]
		public ActionResult GetCommentGroup([FromBody]CommentGroupReadModel commentGroup)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if(role == null)
			{
				return new BadRequestResult();
			}
			var group = _mapperService.Map<CommentGroupReadModel, CommentGroup>(commentGroup);
			var groupId = _commentRepository.AddOrUpdateCommentGroup(group);
			group.Id = groupId;

			var groupViewModel = _mapperService.Map<CommentGroup, CommentGroupViewModel>(group);

			return new JsonResult(groupViewModel);
		}

		[HttpPost]
		[Route("/home/courses/getcomments")]
		public ActionResult GetComments([FromBody] CommentGroupReadModel commentGroup)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			var group = _mapperService.Map<CommentGroupReadModel, CommentGroup>(commentGroup);
			List<Comment> comments;
			try
			{
				comments = _commentRepository.GetComments(group);
			}
			catch (Exception e)
			{
				_logService.AddGetCommentsException(_logger, e, group.Id);
				return new StatusCodeResult(500);
			}
			var commentsViewModel = comments.Select(_mapperService.Map<Comment, CommentViewModel>).ToList();
			commentsViewModel = commentsViewModel.Join(comments, cw => cw.Id, c => c.Id, MapCommentViewModel).ToList();

			return new JsonResult(commentsViewModel);
		}

		[HttpPost]
		public ActionResult RemoveComment([FromBody]CommentReadModel commentReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if(role == null)
			{
				return new BadRequestResult();
			}

			var comment = _mapperService.Map<CommentReadModel, Comment>(commentReadModel);
			_commentRepository.RemoveComment(comment);

			return new OkResult();
		}

		private CommentViewModel MapCommentViewModel(CommentViewModel commentViewModel, Comment comment)
		{
			var user = _userRepository.GetUser(comment.UserId);
			commentViewModel.User = _mapperService.Map<User, UserViewModel>(user);

			return commentViewModel;
		}*/
	}
}