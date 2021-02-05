using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Repositories;
using SuperSoft.Persistence.Services.Comments;
using SuperSoft.Persistence.Services.Courses;
using SuperSoft.Persistence.Services.Lessons;
using SuperSoft.Persistence.Services.MapperService;
using SuperSoft.Persistence.Services.Notifications;
using SuperSoft.Persistence.Services.Tasks;
using SuperSoft.Persistence.Services.Trackers;
using SuperSoft.Persistence.Services.Trainings;
using SuperSoft.Persistence.Services.Users;
using SuperSoft.Persistence.Services.Words;
using MainMapperService = SuperSoft.Services.MapperService.MapperService;

namespace SuperSoft
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddControllersWithViews();
			services.AddMvc();
			services.AddSession(options => { options.IdleTimeout = TimeSpan.FromDays(3); });
			services.AddSingleton<MainMapperService>();
			services.AddSingleton<MapperService>();
			AddRepositories(services);
			AddServices(services);
			// In production, the React files will be served from this directory
			services.AddSpaStaticFiles(configuration => { configuration.RootPath = "client/build"; });
			services.AddHttpsRedirection(options =>
			{
				options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
			});
		}

		private void AddRepositories(IServiceCollection services)
		{
			services.AddSingleton<ICommentRepository, CommentRepository>();
			services.AddSingleton<ICourseRepository, CourseRepository>();
			services.AddSingleton<ILessonRepository, LessonRepository>();
			services.AddSingleton<ILogRepository, LogRepository>();
			services.AddSingleton<INotificationRepository, NotificationRepository>();
			services.AddSingleton<ITaskRepository, TaskRepository>();
			services.AddSingleton<ITrackerRepository, TrackerRepository>();
			services.AddSingleton<ITrainingRepository, TrainingRepository>();
			services.AddSingleton<IUserRepository, UserRepository>();
			services.AddSingleton<IWordRepository, WordRepository>();
			services.AddSingleton<IUserTaskRepository, UserTaskRepository>();
		}

		private void AddServices(IServiceCollection services)
		{
			services.AddSingleton<ICommentEditorService, CommentEditorService>();
			services.AddSingleton<ICommentReaderService, CommentReaderService>();
			services.AddSingleton<ICourseEditorService, CourseEditorService>();
			services.AddSingleton<ICourseReaderService, CourseReaderService>();
			services.AddSingleton<ILessonEditorService, LessonEditorService>();
			services.AddSingleton<ILessonReaderService, LessonReaderService>();
			services.AddSingleton<INotificationEditorService, NotificationEditorService>();
			services.AddSingleton<INotificationReaderService, NotificationReaderService>();
			services.AddSingleton<ITaskEditorService, TaskEditorService>();
			services.AddSingleton<ITaskReaderService, TaskReaderService>();
			services.AddSingleton<ITrackerEditorService, TrackerEditorService>();
			services.AddSingleton<ITrackerReaderService, TrackerReaderService>();
			services.AddSingleton<ITrainingEditorService, TrainingEditorService>();
			services.AddSingleton<ITrainingReaderService, TrainingReaderService>();
			services.AddSingleton<IUserReaderService, UserReaderService>();
			services.AddSingleton<IUserEditorService, UserEditorService>();
			services.AddSingleton<IWordEditorService, WordEditorService>();
			services.AddSingleton<IWordReaderService, WordReaderService>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();
			app.UseSession();

			app.UseRouting();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
					name: "default",
					pattern: "{controller}/{action=Index}/{id?}");
			});

			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "client";

				if (env.IsDevelopment())
				{
					spa.UseReactDevelopmentServer(npmScript: "start");
				}
			});
		}
	}
}