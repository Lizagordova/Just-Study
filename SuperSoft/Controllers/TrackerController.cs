using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services.Trackers;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class TrackerController : Controller
	{
		private readonly MapperService _mapper;
		private readonly ITrackerEditorService _trackerEditor;
		private readonly ITrackerReaderService _trackerReader;
		private readonly ILogger<TrackerController> _logger;
		private readonly LogService _logService;

		public TrackerController(
			ITrackerEditorService trackerEditor,
			ITrackerReaderService trackerReader,
			ILogger<TrackerController> logger,
			MapperService mapper,
			LogService logService
		)
		{
			_mapper = mapper;
			_trackerEditor = trackerEditor;
			_trackerReader = trackerReader;
			_logger = logger;
			_logService = logService;
		}

		[HttpPost]
		[Route("/gettracker")]
		public ActionResult GetTracker([FromBody]TrackerReadModel trackerReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			try
			{
				var tracker = _trackerReader.GetTracker(trackerReadModel.UserId, trackerReadModel.CourseId);
				var trackerViewModel = _mapper.Map<Tracker, TrackerViewModel>(tracker);

				return new JsonResult(trackerViewModel);
			}
			catch (Exception e)
			{
				_logService.AddLogGetTrackerException(_logger, e, trackerReadModel.UserId, trackerReadModel.CourseId);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/addorupdatetracker")]
		public ActionResult AddOrUpdateTracker([FromBody]TrackerReadModel trackerReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			try
			{
				var tracker = _mapper.Map<TrackerReadModel, Tracker>(trackerReadModel);
				_trackerEditor.AddOrUpdateTracker(tracker);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogGetTrackerException(_logger, e, trackerReadModel.UserId, trackerReadModel.CourseId);

				return new StatusCodeResult(500);
			}
		}
	}
}