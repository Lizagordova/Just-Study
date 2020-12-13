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

		[HttpGet]
		[Route("/getprojects")]
		private ActionResult GetProjects()
		{
			var projectsUsers = _projectReader.GetProjects();
			var projectUsersViewModels = projectsUsers
				.Select(p => _mapper.Map<Project, ProjectViewModel>(p))
				.ToList();

			return new JsonResult(projectUsersViewModels);
		}

		[HttpPost]
		[Route("/addorupdateproject")]
		private ActionResult AddOrUpdateProject([FromBody]ProjectReadModel projectReadModel)
		{
			var project = _mapper.Map<ProjectReadModel, Project>(projectReadModel);
			project.Id = _projectEditor.AddOrUpdateProject(project);
			var projectViewModel = _mapper.Map<Project, ProjectViewModel>(project);

			return new JsonResult(projectViewModel);
		}
	}
}