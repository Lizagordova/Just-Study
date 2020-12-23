using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class ProjectController : Controller
	{
		private readonly MapperService _mapper;
		private readonly IProjectReaderService _projectReader;
		private readonly IProjectEditorService _projectEditor;

		public ProjectController(
			MapperService mapper,
			IProjectReaderService projectReader,
			IProjectEditorService projectEditor)
		{
			_mapper = mapper;
			_projectReader = projectReader;
			_projectEditor = projectEditor;
		}

		[HttpPost]
		[Route("/getprojectusers")]
		public ActionResult GetProjectUsers([FromBody]ProjectReadModel projectReadModel)
		{
			var users = _projectReader.GetProjectUsers(projectReadModel.Id);
			var userViewModels = users.Select(_mapper.Map<User, UserViewModel>).ToList();

			return new JsonResult(userViewModels);
		}

		[HttpGet]
		[Route("/getprojects")]
		public ActionResult GetProjects()
		{
			var projectsUsers = _projectReader.GetProjects();
			var projectUsersViewModels = projectsUsers
				.Select(p => _mapper.Map<Project, ProjectViewModel>(p))
				.ToList();

			return new JsonResult(projectUsersViewModels);
		}

		[HttpPost]
		[Route("/addorupdateproject")]
		public ActionResult AddOrUpdateProject([FromBody]ProjectReadModel projectReadModel)
		{
			var project = _mapper.Map<ProjectReadModel, Project>(projectReadModel);
			project.Id = _projectEditor.AddOrUpdateProject(project);
			var projectViewModel = _mapper.Map<Project, ProjectViewModel>(project);

			return new JsonResult(projectViewModel);
		}

		[HttpPost]
		[Route("/attachusertoproject")]
		public ActionResult AttachUserToProject([FromBody]ProjectUserReadModel projectUserReadModel)
		{
			var projectUser = _mapper.Map<ProjectUserReadModel, ProjectUser>(projectUserReadModel);
			projectUser.Project = new Project() { Id = projectUserReadModel.ProjectId };
			projectUser.User = new User() {  Id = projectUserReadModel.UserId};
			_projectEditor.AttachUserToProject(projectUser);

			return new OkResult();
		}

		[HttpPost]
		[Route("/deleteproject")]
		public ActionResult DeleteProject([FromBody]ProjectReadModel projectReadModel)
		{
			_projectEditor.DeleteProject(projectReadModel.Id);

			return new OkResult();
		}
	}
}