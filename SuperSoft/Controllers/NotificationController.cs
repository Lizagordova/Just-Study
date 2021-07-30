using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services.Notifications;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class NotificationController : Controller
	{
		private readonly INotificationReaderService _notificationReader;
		private readonly INotificationEditorService _notificationEditor;
		private readonly ILogger<NotificationController> _logger;
		private readonly MapperService _mapper;
		private readonly LogService _logService;

		public NotificationController(
			INotificationReaderService notificationReader,
			INotificationEditorService notificationEditor,
			ILogger<NotificationController> logger,
			MapperService mapper,
			LogService logService)
		{
			_notificationReader = notificationReader;
			_notificationEditor = notificationEditor;
			_logger = logger;
			_mapper = mapper;
			_logService = logService;
		}

		[HttpPost]
		[Authorize(Roles = "User,Admin")]
		[Route("/getnotifications")]
		public ActionResult GetNotifications([FromBody]UserReadModel user)
		{
			try
			{
				var notifications = _notificationReader.GetNotifications(user.Id);
				var notificationsViewModels = notifications.Select(_mapper.Map<Notification, NotificationViewModel>).ToList();

				return new JsonResult(notificationsViewModels);
			}
			catch (Exception e)
			{
				_logService.AddLogGetNotificationsException(_logger, e, user.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "User,Admin")]
		[Route("/addorupdateusernotification")]
		public ActionResult AddOrUpdateUserNotification([FromBody]UserNotificationReadModel userNotificationReadModel)
		{
			var userNotification = _mapper.Map<UserNotificationReadModel, UserNotification>(userNotificationReadModel);
			try
			{
				_notificationEditor.AddOrUpdateUserNotification(userNotification);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateUserNotificationException(_logger, e, userNotificationReadModel.UserId, userNotificationReadModel.NotificationId);

				return new StatusCodeResult(500);
			}
		}
	}
}