using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services.Tags;
using SuperSoft.Domain.Services.Tasks;
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
		private readonly MapHelper _mapHelper;

		public TaskController(
			MapperService mapper,
			ITaskEditorService taskEditor,
			ITaskReaderService taskReader,
			ITagReaderService tagReader,
			ILogger<TaskController> logger,
			LogService logService,
			MapHelper mapHelper)
		{
			_mapper = mapper;
			_taskEditor = taskEditor;
			_taskReader = taskReader;
			_tagReader = tagReader;
			_logger = logger;
			_logService = logService;
			_mapHelper = mapHelper;
		}

		[HttpPost]
		[Authorize(Roles = "User,Admin")]
		[Route("/gettasksbychoosenlesson")]
		public ActionResult GetTasksByChoosenLesson([FromBody]LessonReadModel lessonReadModel)
		{
			try
			{
				var tasks = _taskReader.GetTasksByChoosenLesson(lessonReadModel.Id);
				var taskViewModels = tasks.Select(_mapHelper.MapTaskViewModel).ToList();

				return new JsonResult(taskViewModels);
			}
			catch (Exception e)
			{
				_logService.AddLogGetTasksByChoosenLessonException(_logger, e, lessonReadModel.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "Admin")]
		[Route("/addorupdatetask")]
		public ActionResult AddOrUpdateTask([FromForm]TaskReadModel taskReadModel)
		{
			var task = _mapper.Map<TaskReadModel, Task>(taskReadModel);
			task.Tags = taskReadModel.TagIds.Select(tId => new Tag()
			{
				Id = tId
			}).ToList();
			try
			{
				var taskId = _taskEditor.AddOrUpdateTask(task);
				if (taskReadModel.LessonId != 0 )
				{
					_taskEditor.AttachTaskToLesson(taskId, taskReadModel.LessonId, taskReadModel.Order);
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
		[Authorize(Roles = "Admin")]
		[Route("/attachtasktolesson")]
		public ActionResult AttachTaskToLesson([FromBody]TaskReadModel taskReadModel)
		{
			try
			{
				_taskEditor.AttachTaskToLesson(taskReadModel.Id, taskReadModel.LessonId, taskReadModel.Order);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAttachTaskToLessonException(_logger, e, taskReadModel.Id, taskReadModel.LessonId);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "Admin")]
		[Route("/addorupdatesubtask")]
		public ActionResult AddOrUpdateSubtask([FromForm]SubtaskReadModel subtaskReadModel)
		{
			var subtask = _mapper.Map<SubtaskReadModel, Subtask>(subtaskReadModel);
			try
			{
				var subtaskId = _taskEditor.AddOrUpdateSubtask(subtask, subtaskReadModel.TaskId);

				return new JsonResult(subtaskId);
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateSubtaskException(_logger, e,subtaskReadModel.Text, subtask.Order);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "Admin")]
		[Route("/deletetask")]
		public ActionResult DeleteTask([FromBody]TaskReadModel taskReadModel)
		{
			try
			{
				if (taskReadModel.DeleteOnlyFromLesson)
				{
					_taskEditor.DeleteTaskFromLesson(taskReadModel.Id, taskReadModel.LessonId);
				}
				else
				{
					_taskEditor.DeleteTask(taskReadModel.Id);
				}

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogDeleteTaskException(_logger, e, taskReadModel.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "Admin")]
		[Route("/deletesubtask")]
		public ActionResult DeleteSubtask([FromBody]SubtaskReadModel subtaskReadModel)
		{
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
		[Authorize(Roles = "User,Admin")]
		[Route("/gettaskbyid")]
		public ActionResult GetTaskById([FromBody]TaskReadModel taskReadModel)
		{
			try
			{
				var task = _taskReader.GetTaskById(taskReadModel.Id);
				var taskViewModel = _mapHelper.MapTaskViewModel(task);

				return new JsonResult(taskViewModel);
			}
			catch (Exception e)
			{
				_logService.AddLogGetTaskByIdException(_logger, e, taskReadModel.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "Admin")]
		[Route("/attachtagstotask")]
		public ActionResult GetTaskById([FromBody]TaskTagReadModel taskTagReadModel)
		{
			try
			{
				_taskEditor.AttachTagsToTask(taskTagReadModel.TaskId, taskTagReadModel.TagIds);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAttachTagsToTaskException(_logger, e, taskTagReadModel.TaskId);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "Admin")]
		[Route("/attachsubtagstotask")]
		public ActionResult AttachSubtagsToTask([FromBody]TaskTagReadModel taskTagReadModel)
		{
			try
			{
				_taskEditor.AttachSubtagsToTask(taskTagReadModel.TaskId, taskTagReadModel.SubtagIds);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAttachTagsToTaskException(_logger, e, taskTagReadModel.TaskId);

				return new StatusCodeResult(500);
			}
		}
	}
}