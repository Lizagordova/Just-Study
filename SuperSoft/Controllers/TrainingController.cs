using System;
using System.Linq;
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

		public TrainingController(
			MapperService mapper,
			ITrainingEditorService trainingEditor,
			ITrainingReaderService trainingReader,
			ILogger<TrainingController> logger,
			LogService logService)
		{
			_mapper = mapper;
			_trainingEditor = trainingEditor;
			_trainingReader = trainingReader;
			_logger = logger;
			_logService = logService;
		}

		[HttpPost]
		[Route("/gettasks")]
		public ActionResult GetTasks([FromBody]TrainingTasksQuery tasksQuery)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			var query = new TrainingTaskQuery {TagIds = tasksQuery.TagIds};
			try
			{
				var tasks = _trainingReader.GetTasks(query);
				var tasksViewModels = tasks.Select(_mapper.Map<Task, TaskViewModel>).ToList();

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