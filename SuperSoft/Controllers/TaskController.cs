using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
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

		public TaskController(
			MapperService mapper,
			ITaskReaderService taskReader,
			ITaskEditorService taskEditor
			)
		{
			_mapper = mapper;
			_taskReader = taskReader;
			_taskEditor = taskEditor;
		}

		[HttpGet]
		[Route("/getusertasks")]
		public ActionResult GetUserTasks([FromBody]UserReadModel userReadModel)
		{
			var userTaskProjects = _taskReader.GetUserTasks(userReadModel.Id);
			var userTaskProjectsViewModels = MapUserTaskProjectViewModels(userTaskProjects.Item1, userTaskProjects.Item2);

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

		private IReadOnlyCollection<UserTaskProjectViewModel> MapUserTaskProjectViewModels(IReadOnlyCollection<UserTask> userTasks, IReadOnlyCollection<ProjectTask>projectTasks)
		{
			var userTaskProjects = userTasks
				.Join(projectTasks,
					ut => ut.Task.Id,
					p => p.Task.Id,
					MapUserTaskProjectViewModel)
				.ToList();

			return userTaskProjects;
		}

		private UserTaskProjectViewModel MapUserTaskProjectViewModel(UserTask userTask, ProjectTask projectTask)
		{
			var userTaskProject = new UserTaskProjectViewModel();
			userTaskProject.User = _mapper.Map<User, UserViewModel>(userTask.User);
			userTaskProject.Project = _mapper.Map<Project, ProjectViewModel>(projectTask.Project);
			userTaskProject.Task = _mapper.Map<Task, TaskViewModel>(userTask.Task);

			return userTaskProject;
		}
	}
}