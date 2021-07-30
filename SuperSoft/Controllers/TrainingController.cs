using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Services.Trainings;
using SuperSoft.Helpers;
using SuperSoft.ReadModels.Queries;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class TrainingController : Controller
	{
		private readonly MapperService _mapper;
		private readonly ITrainingEditorService _trainingEditor;
		private readonly ITrainingReaderService _trainingReader;
		private readonly ILogger<TrainingController> _logger;
		private readonly LogService _logService;
		private readonly MapHelper _mapHelper;

		public TrainingController(
			MapperService mapper,
			ITrainingEditorService trainingEditor,
			ITrainingReaderService trainingReader,
			ILogger<TrainingController> logger,
			LogService logService,
			MapHelper mapHelper)
		{
			_mapper = mapper;
			_trainingEditor = trainingEditor;
			_trainingReader = trainingReader;
			_logger = logger;
			_logService = logService;
			_mapHelper = mapHelper;
		}

		[HttpPost]
		[Authorize(Roles = "User,Admin")]
		[Route("/gettasks")]
		public ActionResult GetTasks([FromBody]TrainingTasksQuery tasksQuery)
		{
			var query = new TrainingTaskQuery { TagIds = tasksQuery.TagIds, IgnoreIds = tasksQuery.IgnoreIds, SubtagIds = tasksQuery.SubtagIds };
			try
			{
				var tasks = _trainingReader.GetTasks(query);
				var tasksViewModels = tasks.Select(_mapHelper.MapTaskViewModel).ToList();

				return new JsonResult(tasksViewModels);
			}
			catch (Exception e)
			{
				_logService.AddLogGetTasksException(_logger, e);

				return new StatusCodeResult(500);
			}
		}
	}
}