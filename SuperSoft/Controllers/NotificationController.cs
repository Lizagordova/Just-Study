﻿using System;
using System.Linq;
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
		[Route("/getnotifications")]
		public ActionResult GetNotifications([FromBody]UserReadModel user)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			try
			{
				var notifications = _notificationReader.GetNotifications(user.Id);
				var notificationsViewModels =
					notifications.Select(_mapper.Map<Notification, NotificationViewModel>).ToList();

				return new JsonResult(notificationsViewModels);
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
				throw;
			}
		}
	}
}