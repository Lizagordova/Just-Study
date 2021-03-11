﻿using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services.Progress;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.ReadModels.Queries;
using SuperSoft.Services;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class ProgressController : Controller
	{
		private readonly IProgressReaderService _progressReader;
		private readonly LogService _logService;
		private readonly ILogger<IProgressReaderService> _logger;
		
		public ProgressController(
			IProgressReaderService progressReader,
			LogService logService,
			ILogger<IProgressReaderService> logger
			)
		{
			_progressReader = progressReader;
			_logService = logService;
			_logger = logger;
		}

		[HttpPost]
		[Route("/getusercourseprogress")]
		public ActionResult GetUserCourseProgress([FromBody]UserCourseReadModel userCourse)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			try
			{
				var progress = _progressReader.GetUserCourseProgress(userCourse.UserId, userCourse.CourseId);

				return new JsonResult(progress);
			}
			catch (Exception e)
			{
				_logService.AddLogGetUserCourseProgressException(_logger, e, userCourse.UserId, userCourse.CourseId);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/getprogressbylesson")]
		public ActionResult GetProgressByLesson([FromBody]LessonReadModel lessonReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

			try
			{
				var progress = _progressReader.GetProgressByLesson(lessonReadModel.Id);

				return new JsonResult(progress);
			}
			catch (Exception e)
			{
				_logService.AddLogGetProgressByLessonException(_logger, e, lessonReadModel.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/getuserprogressbylesson")]
		public ActionResult GetUserProgressByLesson([FromBody]ProgressQueryReadModel query)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

			try
			{
				var progress = _progressReader.GetUserProgressByLesson(query.UserId, query.LessonId);

				return new JsonResult(progress);
			}
			catch (Exception e)
			{
				_logService.AddLogGetUserProgressByLessonException(_logger, e, query.UserId, query.LessonId);

				return new StatusCodeResult(500);
			}
		}
	}
}