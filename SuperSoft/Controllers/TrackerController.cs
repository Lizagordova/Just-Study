using System;
using Microsoft.AspNetCore.Authorization;
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
		private readonly MapHelper _mapHelper;

		public TrackerController(
			ITrackerEditorService trackerEditor,
			ITrackerReaderService trackerReader,
			ILogger<TrackerController> logger,
			MapperService mapper,
			LogService logService,
			MapHelper mapHelper
		)
		{
			_mapper = mapper;
			_trackerEditor = trackerEditor;
			_trackerReader = trackerReader;
			_logger = logger;
			_logService = logService;
			_mapHelper = mapHelper;
		}

		[HttpPost]
		[Authorize(Roles = "User,Admin")]
		[Route("/gettracker")]
		public ActionResult GetTracker([FromBody]TrackerReadModel trackerReadModel)
		{
			try
			{
				var tracker = _trackerReader.GetTracker(trackerReadModel.UserId, trackerReadModel.CourseId);
				var trackerViewModel = _mapHelper.MapTrackerViewModel(tracker);

				return new JsonResult(trackerViewModel);
			}
			catch (Exception e)
			{
				_logService.AddLogGetTrackerException(_logger, e, trackerReadModel.UserId, trackerReadModel.CourseId);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "User,Admin")]
		[Route("/addorupdatetracker")]
		public ActionResult AddOrUpdateTracker([FromBody]TrackerReadModel trackerReadModel)
		{
			try
			{
				var tracker = _mapHelper.MapTracker(trackerReadModel);
				_trackerEditor.AddOrUpdateTracker(tracker, trackerReadModel.UserId, trackerReadModel.CourseId);

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