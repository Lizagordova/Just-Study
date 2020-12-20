using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class TaskController : Controller
	{
		private readonly MapperService _mapper;
		private readonly ITaskReaderService _taskReader;
		private readonly ITaskEditorService _taskEditor;
		private readonly IProjectEditorService _projectEditor;

		public TaskController(
			MapperService mapper,
			ITaskReaderService taskReader,
			ITaskEditorService taskEditor,
			IProjectEditorService projectEditor
			)
		{
			_mapper = mapper;
			_taskReader = taskReader;
			_taskEditor = taskEditor;
			_projectEditor = projectEditor;
		}

		[HttpGet]
		[Route("/getusertasks")]
		public ActionResult GetUserTasks([FromBody]UserReadModel userReadModel)
		{
			var userTasks = _taskReader.GetUserTasks(userReadModel.Id);
			var userTaskProjectsViewModels = userTasks.Select(MapUserUserTaskViewModel).ToList();

			return new JsonResult(userTaskProjectsViewModels);
		}

		[HttpPost]
		[Route("/gettasks")]
		public ActionResult GetTasks([FromBody]ProjectReadModel projectReadModel)
		{
			var tasks = _taskReader.GetTasks(projectReadModel.Id);
			var taskViewModels = tasks.Select(_mapper.Map<Task, TaskViewModel>).ToList();

			return new JsonResult(taskViewModels);
		}

		[HttpPost]
		[Route("/addorupdatetask")]
		public ActionResult AddOrUpdateTask([FromBody]TaskReadModel taskReadModel)
		{
			var task = _mapper.Map<TaskReadModel, Task>(taskReadModel);
			var taskId = _taskEditor.AddOrUpdateTask(task);
			_taskEditor.AddOrUpdateUserTask(new UserTask() { User = new User() { Id = taskReadModel.Responsible }, Task = new Task() { Id = taskReadModel.Id}, Role = TaskRole.Responsible });
			_taskEditor.AddOrUpdateUserTask(new UserTask() { User = new User() { Id = taskReadModel.Tester }, Task = new Task() { Id = taskReadModel.Id}, Role = TaskRole.Tester });
			_taskEditor.AddOrUpdateUserTask(new UserTask() { User = new User() { Id = taskReadModel.Author }, Task = new Task() { Id = taskReadModel.Id}, Role = TaskRole.Author });
			if (taskReadModel.ProjectId != 0)
			{
				_projectEditor.AttachTaskToProject(taskId, taskReadModel.ProjectId);
			}
			task.Id = taskId;
			var taskViewModel = _mapper.Map<Task, TaskReadModel>(task);

			return new JsonResult(taskViewModel);
		}

		private UserTaskViewModel MapUserUserTaskViewModel(UserTask userTask)
		{
			var userTaskViewModel = _mapper.Map<UserTask, UserTaskViewModel>(userTask);
			userTaskViewModel.Task = _mapper.Map<Task, TaskViewModel>(userTask.Task);
			userTaskViewModel.User = _mapper.Map<User, UserViewModel>(userTask.User);

			return userTaskViewModel;
		}
	}
}