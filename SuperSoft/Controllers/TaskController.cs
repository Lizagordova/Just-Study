using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class TaskController : Controller
	{
		private readonly MapperService _mapper;
		private readonly ITaskEditorService _taskEditor;
		private readonly ITaskReaderService _taskReader;
		private readonly ITagReaderService _tagReader;
		private readonly ILogger<TaskController> _logger;
		private readonly LogService _logService;

		public TaskController(
			MapperService mapper,
			ITaskEditorService taskEditor,
			ITaskReaderService taskReader,
			ITagReaderService tagReader,
			ILogger<TaskController> logger,
			LogService logService)
		{
			_mapper = mapper;
			_taskEditor = taskEditor;
			_taskReader = taskReader;
			_tagReader = tagReader;
			_logger = logger;
			_logService = logService;
		}

		[HttpPost]
		[Route("/gettasksbychoosenlesson")]
		public ActionResult GetTasksByChoosenLesson([FromBody]LessonReadModel lessonReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			try
			{
				var tasks = _taskReader.GetTasksByChoosenLesson(lessonReadModel.Id);
				var taskViewModels = tasks.Select(_mapper.Map<Task, TaskViewModel>).ToList();

				return new JsonResult(taskViewModels);
			}
			catch (Exception e)
			{
				_logService.AddLogGetTasksByChoosenLessonException(_logger, e, lessonReadModel.Id);

				return new StatusCodeResult(500);
			}
		}
		
		[HttpGet]
		[Route("/gettags")]
		public ActionResult GetTags()
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			try
			{
				var tags = _tagReader.GetTags();
				var tagViewModels = tags.Select(_mapper.Map<Tag, TagViewModel>).ToList();

				return new JsonResult(tagViewModels);
			}
			catch (Exception e)
			{
				_logService.AddLogGetTagsException(_logger, e);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/addorupdatetask")]
		public ActionResult AddOrUpdateTask([FromBody]TaskReadModel taskReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

			var task = _mapper.Map<TaskReadModel, Task>(taskReadModel);
			try
			{
				var taskId = _taskEditor.AddOrUpdateTask(task);
				if (taskReadModel.LessonId != 0)
				{
					_taskEditor.AttachTaskToLesson(taskId, taskReadModel.LessonId);
				}

				return new JsonResult(taskId);
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateTaskException(_logger, e);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/addorupdatesubtask")]
		public ActionResult AddOrUpdateSubtask([FromBody]SubtaskReadModel subtaskReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

			var subtask = _mapper.Map<SubtaskReadModel, Subtask>(subtaskReadModel);
			try
			{
				var subtaskId = _taskEditor.AddOrUpdateSubtask(subtask, subtaskReadModel.TaskId);

				return new JsonResult(subtaskId);
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateSubtaskException(_logger, e);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/deletetask")]
		public ActionResult DeleteTask([FromBody]TaskReadModel taskReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

			try
			{
				_taskEditor.DeleteTask(taskReadModel.Id);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogDeleteTaskException(_logger, e, taskReadModel.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/deletesubtask")]
		public ActionResult DeleteSubtask([FromBody]SubtaskReadModel subtaskReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

			try
			{
				_taskEditor.DeleteSubtask(subtaskReadModel.Id);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogDeleteSubtaskException(_logger, e, subtaskReadModel.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/gettaskbyid")]
		public ActionResult GetTaskById([FromBody]TaskReadModel taskReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			try
			{
				var task = _taskReader.GetTaskById(taskReadModel.Id);

				return new JsonResult(task);
			}
			catch (Exception e)
			{
				_logService.AddLogGetTaskByIdException(_logger, e, taskReadModel.Id);

				return new StatusCodeResult(500);
			}
		}
	}
}