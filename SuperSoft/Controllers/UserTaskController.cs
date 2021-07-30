using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services.UserTasks;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class UserTaskController : Controller
	{
		private readonly MapperService _mapper;
		private readonly IUserTaskEditorService _userTaskEditor;
		private readonly IUserTaskReaderService _userTaskReader;
		private readonly ILogger<TaskController> _logger;
		private readonly MapHelper _mapHelper;
		private readonly LogService _logService;

		public UserTaskController(
			MapperService mapper,
			IUserTaskEditorService userTaskEditor,
			IUserTaskReaderService userTaskReader,
			MapHelper mapHelper,
			ILogger<TaskController> logger,
			LogService logService)
		{
			_mapper = mapper;
			_userTaskEditor = userTaskEditor;
			_userTaskReader = userTaskReader;
			_mapHelper = mapHelper;
			_logger = logger;
			_logService = logService;
		}

		[HttpPost]
		[Authorize(Roles = "User,Admin")]
		[Route("/getusertask")]
		public ActionResult GetUserTask([FromBody]UserTaskReadModel userTaskReadModel)
		{
			try
			{
				var userTask = _userTaskReader.GetUserTask(userTaskReadModel.TaskId, userTaskReadModel.UserId);
				var userTasksViewModel = _mapHelper.MapUserTaskViewModel(userTask);

				return new JsonResult(userTasksViewModel);
			}
			catch (Exception e)
			{
				_logService.AddLogGetUserTaskException(_logger, e, userTaskReadModel.TaskId, userTaskReadModel.UserId);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "User,Admin")]
		[Route("/getusersubtask")]
		public ActionResult GetUserSubtask([FromBody]UserSubtaskReadModel userSubtaskReadModel)
		{
			try
			{
				var subtask = _userTaskReader.GetUserSubtask(userSubtaskReadModel.SubtaskId, userSubtaskReadModel.UserId);
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
		[Authorize(Roles = "User,Admin")]
		[Route("/addorupdateusersubtask")]
		public ActionResult AddOrUpdateUserSubtask([FromForm]UserSubtaskReadModel userSubtaskReadModel)
		{
			var userSubtask = _mapper.Map<UserSubtaskReadModel, UserSubtask>(userSubtaskReadModel);
			try
			{
				_userTaskEditor.AddOrUpdateUserSubtask(userSubtask, userSubtaskReadModel.UserId, userSubtaskReadModel.SubtaskId);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateUserSubtaskException(_logger, e, userSubtask, userSubtaskReadModel.SubtaskId, userSubtaskReadModel.UserId);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "User,Admin")]
		[Route("/addorupdateusersubtaskanswergroup")]
		public ActionResult AddOrUpdateUserSubtaskAnswerGroup([FromBody]UserSubtaskAnswerGroupReadModel userSubtaskAnswerGroupReadModel)
		{
			var userSubtaskAnswerGroup = _mapper.Map<UserSubtaskAnswerGroupReadModel, UserSubtaskAnswerGroup>(userSubtaskAnswerGroupReadModel);
			try
			{
				_userTaskEditor.AddOrUpdateUserSubtaskAnswerGroup(userSubtaskAnswerGroup, userSubtaskAnswerGroupReadModel.UserId);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateUserSubtaskAnswerGroupException(_logger, e, userSubtaskAnswerGroup, userSubtaskAnswerGroupReadModel.SubtaskId, userSubtaskAnswerGroupReadModel.UserId);

				return new StatusCodeResult(500);
			}
		}
		
		[HttpPost]
		[Authorize(Roles = "User")]
		[Route("/deleteusersubtask")]
		public ActionResult DeleteUserSubtask([FromBody]UserSubtaskReadModel userSubtask)
		{
			try
			{
				_userTaskEditor.DeleteUserSubtask(userSubtask.UserId, userSubtask.SubtaskId);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogDeleteUserSubtaskException(_logger, e, userSubtask.SubtaskId, userSubtask.UserId);

				return new StatusCodeResult(500);
			}
		}
	}
}