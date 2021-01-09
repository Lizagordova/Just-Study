using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class UserTaskController : Controller
	{
		private readonly MapperService _mapper;
		private readonly ITaskEditorService _taskEditor;
		private readonly ITaskReaderService _taskReader;
		private readonly ILogger<TaskController> _logger;
		private readonly LogService _logService;

		public UserTaskController(
			MapperService mapper,
			ITaskEditorService taskEditor,
			ITaskReaderService taskReader,
			ILogger<TaskController> logger,
			LogService logService)
		{
			_mapper = mapper;
			_taskEditor = taskEditor;
			_taskReader = taskReader;
			_logger = logger;
			_logService = logService;
		}

		[HttpPost]
		[Route("/getusertask")]
		public ActionResult GetUserTask([FromBody]UserTaskReadModel userTaskReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			try
			{
				var userTask = _taskReader.GetUserTask(userTaskReadModel.TaskId, userTaskReadModel.UserId);
				var userTasksViewModel = _mapper.Map<UserTask, UserTaskViewModel>(userTask);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogGetUserTaskException(_logger, e, userTaskReadModel.TaskId, userTaskReadModel.UserId);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/getusersubtask")]
		public ActionResult GetUserSubtask([FromBody]UserSubtaskReadModel userSubtaskReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			try
			{
				var subtask = _taskReader.GetUserSubtask(userSubtaskReadModel.SubtaskId, userSubtaskReadModel.UserId);
				var subtaskViewModel = _mapper.Map<UserSubtask, UserSubtaskViewModel>(subtask);

				return new JsonResult(subtaskViewModel);
			}
			catch (Exception e)
			{
				_logService.AddLogGetUserSubtaskException(_logger, e, userSubtaskReadModel.SubtaskId, userSubtaskReadModel.UserId);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/addorupdateusersubtask")]
		public ActionResult AddOrUpdateUserSubtask([FromBody]UserSubtaskReadModel userSubtaskReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			var userSubtask = _mapper.Map<UserSubtaskReadModel, UserSubtask>(userSubtaskReadModel);
			try
			{
				_taskEditor.AddOrUpdateUserSubtask(userSubtask, userSubtaskReadModel.UserId, userSubtaskReadModel.SubtaskId, userSubtaskReadModel.TaskId);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateUserSubtaskException(_logger, e, userSubtask, userSubtaskReadModel.SubtaskId, userSubtaskReadModel.UserId);

				return new StatusCodeResult(500);
			}
		}
	}
}