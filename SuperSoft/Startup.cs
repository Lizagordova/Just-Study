using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Authorization;
using SuperSoft.Domain.Services.Comments;
using SuperSoft.Domain.Services.Courses;
using SuperSoft.Domain.Services.Feedbacks;
using SuperSoft.Domain.Services.Lessons;
using SuperSoft.Domain.Services.Notifications;
using SuperSoft.Domain.Services.Progress;
using SuperSoft.Domain.Services.Tags;
using SuperSoft.Domain.Services.Tasks;
using SuperSoft.Domain.Services.Trackers;
using SuperSoft.Domain.Services.Trainings;
using SuperSoft.Domain.Services.Users;
using SuperSoft.Domain.Services.UserTasks;
using SuperSoft.Domain.Services.Words;
using SuperSoft.Helpers;
using SuperSoft.Persistence.Repositories;
using SuperSoft.Persistence.Services.Authorization;
using SuperSoft.Persistence.Services.Comments;
using SuperSoft.Persistence.Services.Courses;
using SuperSoft.Persistence.Services.Feedbacks;
using SuperSoft.Persistence.Services.Lessons;
using SuperSoft.Persistence.Services.MapperService;
using SuperSoft.Persistence.Services.Notifications;
using SuperSoft.Persistence.Services.Progress;
using SuperSoft.Persistence.Services.Tags;
using SuperSoft.Persistence.Services.Tasks;
using SuperSoft.Persistence.Services.Trackers;
using SuperSoft.Persistence.Services.Trainings;
using SuperSoft.Persistence.Services.Users;
using SuperSoft.Persistence.Services.UserTasks;
using SuperSoft.Persistence.Services.Words;
using SuperSoft.Services;
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
			services.AddSession(options =>
			{
				options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
				options.IdleTimeout = TimeSpan.FromDays(3);
				options.Cookie.HttpOnly = true;
				options.Cookie.IsEssential = true;
			});
			services.AddControllersWithViews();
			services.AddMvc();
			AddRepositories(services);
			AddServices(services);
			// In production, the React files will be served from this directory
			services.AddSpaStaticFiles(configuration => { configuration.RootPath = "client/build"; });
			services.AddHttpsRedirection(options =>
			{
				options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
			});
			services.Configure<IISServerOptions>(options =>
			{
				options.MaxRequestBodySize = int.MaxValue;
			});
			services.Configure<KestrelServerOptions>(options =>
			{
				options.Limits.MaxRequestBodySize = int.MaxValue; // if don't set default value is: 30 MB
			});
			services.Configure<FormOptions>(x =>
			{
				x.ValueLengthLimit = int.MaxValue;
				x.MultipartBodyLengthLimit = int.MaxValue; // In case of multipart
			});
			var authOptionsConfiguration = Configuration.GetSection("Auth");
			var authOptions = authOptionsConfiguration.Get<AuthOptions>();
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(options =>
				{
					options.RequireHttpsMetadata = false;
					options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
					{
						ValidateIssuer = true,
						ValidIssuer = authOptions.Issuer,
						ValidateAudience = true,
						ValidAudience = authOptions.Audience,
						ValidateLifetime = true,
						IssuerSigningKey = authOptions.GetSymmetricSecurityKey(),
						ValidateIssuerSigningKey = true
					};
				});
			services.Configure<AuthOptions>(authOptionsConfiguration);
			services.AddCors(options =>
			{
				options.AddDefaultPolicy(
					builder =>
					{
						builder.AllowAnyOrigin()
							.AllowAnyMethod()
							.AllowAnyHeader();
					});
			});
		}

		private void AddRepositories(IServiceCollection services)
		{
			services.AddSingleton<ICommentRepository, CommentRepository>();
			services.AddSingleton<ICourseRepository, CourseRepository>();
			services.AddSingleton<ILessonRepository, LessonRepository>();
			services.AddSingleton<IGarbageRepository, GarbageRepository>();
			services.AddSingleton<ILogRepository, LogRepository>();
			services.AddSingleton<INotificationRepository, NotificationRepository>();
			services.AddSingleton<ITagRepository, TagRepository>();
			services.AddSingleton<ITaskRepository, TaskRepository>();
			services.AddSingleton<ITrackerRepository, TrackerRepository>();
			services.AddSingleton<ITrainingRepository, TrainingRepository>();
			services.AddSingleton<IProgressRepository, ProgressRepository>();
			services.AddSingleton<IUserRepository, UserRepository>();
			services.AddSingleton<IWordRepository, WordRepository>();
			services.AddSingleton<IUserTaskRepository, UserTaskRepository>();
			services.AddSingleton<IFeedbackRepository, FeedbackRepository>();
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
			//services.AddSingleton<IProgressEditorService, ProgressEd>();
			services.AddSingleton<IProgressReaderService, ProgressReaderService>();
			services.AddSingleton<ITagReaderService, TagReaderService>();
			services.AddSingleton<ITagEditorService, TagEditorService>();
			services.AddSingleton<ITaskEditorService, TaskEditorService>();
			services.AddSingleton<ITaskReaderService, TaskReaderService>();
			services.AddSingleton<IUserTaskEditorService, UserTaskEditorService>();
			services.AddSingleton<IUserTaskReaderService, UserTaskReaderService>();
			services.AddSingleton<ITrackerEditorService, TrackerEditorService>();
			services.AddSingleton<ITrackerReaderService, TrackerReaderService>();
			services.AddSingleton<ITrainingEditorService, TrainingEditorService>();
			services.AddSingleton<ITrainingReaderService, TrainingReaderService>();
			services.AddSingleton<IUserReaderService, UserReaderService>();
			services.AddSingleton<IUserEditorService, UserEditorService>();
			services.AddSingleton<IWordEditorService, WordEditorService>();
			services.AddSingleton<IWordReaderService, WordReaderService>();
			services.AddSingleton<IJwtGeneratorService, JwtGeneratorService>();
			services.AddSingleton<IFeedbackEditorService, FeedbackEditorService>();
			services.AddSingleton<IFeedbackReaderService, FeedbackReaderService>();
			services.AddSingleton<IAuthorizationService, AuthorizationService>();
			services.AddSingleton<LogService>();
			services.AddSingleton<MainMapperService>();
			services.AddSingleton<MapperService>();
			services.AddSingleton<NotificationService>();
			services.AddSingleton<MapHelper>();
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
			app.UseCors();

			app.UseAuthentication();
			app.UseAuthorization();
			
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
				// endpoints.MapControllerRoute(
				// 	name: "default",
				// 	pattern: "{controller}/{action=Index}/{id?}");
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