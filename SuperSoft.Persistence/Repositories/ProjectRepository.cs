using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models;
using SuperSoft.Persistence.Services.MapperService;

namespace SuperSoft.Persistence.Repositories
{
	public class ProjectRepository : IProjectRepository
	{
		private readonly MapperService _mapper;
		private const string GetProjectsSp = "ProjectRepository_GetProjects";
		private const string AddOrUpdateProjectSp = "ProjectRepository_AddOrUpdateProject";
		private const string DeleteProjectSp = "ProjectRepository_DeleteProject";
		private const string AttachUserToProjectSp = "ProjectRepository_AttachUserToProject";
		private const string AttachTaskToProjectSp = "ProjectRepository_AttachTaskToProject";
		private const string GetProjectUsersSp = "ProjectRepository_GetProjectUsers";
		public ProjectRepository(MapperService mapper)
		{
			_mapper = mapper;
		}

		public IReadOnlyCollection<User> GetProjectUsers(int projectId)
		{
			var param = new DynamicTvpParameters();
			param.Add("projectId", projectId);
			var conn = DatabaseHelper.OpenConnection();
			var projectUsersUdt = conn.Query<UserUdt>(GetProjectUsersSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
			var users = projectUsersUdt.Select(_mapper.Map<UserUdt, User>).ToList();

			return users;
		}

		public IReadOnlyCollection<Project> GetProjects()
		{
			var conn = DatabaseHelper.OpenConnection();
			var projectsUdt = conn.Query<ProjectUdt>(GetProjectsSp, commandType: CommandType.StoredProcedure).ToList();
			DatabaseHelper.CloseConnection(conn);
			var projects = projectsUdt.Select(_mapper.Map<ProjectUdt, Project>).ToList();

			return projects;
		}

		public void AttachUserToProject(ProjectUser projectUser)
		{
			var param = GetAttachUserToProjectParam(projectUser);
			var conn = DatabaseHelper.OpenConnection();
			conn.Query(AttachUserToProjectSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public void DeleteProject(int projectId)
		{
			var param = new DynamicTvpParameters();
			param.Add("projectId", projectId);
			var conn = DatabaseHelper.OpenConnection();
			conn.Query(DeleteProjectSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public int AddOrUpdateProject(Project project)
		{
			var param = GetAddOrUpdateProjectParam(project);
			var conn = DatabaseHelper.OpenConnection();
			var projectId = conn.Query<int>(AddOrUpdateProjectSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return projectId;
		}

		public void AttachTaskToProject(int taskId, int projectId)
		{
			var param = new DynamicTvpParameters();
			param.Add("projectId", projectId);
			param.Add("taskId", taskId);
			var conn = DatabaseHelper.OpenConnection();
			conn.Query(AttachTaskToProjectSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		private DynamicTvpParameters GetAddOrUpdateProjectParam(Project project)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("project", "UDT_Project");
			var udt = _mapper.Map<Project, ProjectUdt>(project);
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}

		private DynamicTvpParameters GetAttachUserToProjectParam(ProjectUser projectUser)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("userProject", "UDT_Project_User");
			var udt = _mapper.Map<ProjectUser, ProjectUserUdt>(projectUser);
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}
	}
}