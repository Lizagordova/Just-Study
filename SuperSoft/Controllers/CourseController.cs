using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Services.Courses;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.ReadModels.Queries;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class CourseController : Controller
	{
		private readonly MapperService _mapper;
		private readonly ICourseEditorService _courseEditor;
		private readonly ICourseReaderService _courseReader;
		private readonly ILogger<CourseController> _logger;
		private readonly LogService _logService;

		public CourseController(
			MapperService mapper,
			ICourseEditorService courseEditor,
			ICourseReaderService courseReader,
			ILogger<CourseController> logger,
			LogService logService)
		{
			_mapper = mapper;
			_courseEditor = courseEditor;
			_courseReader = courseReader;
			_logger = logger;
			_logService = logService;
		}

		[HttpPost]
		[Route("/addorupdatecourse")]
		public ActionResult AddOrUpdateCourse([FromBody]CourseReadModel courseReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			var userId = SessionHelper.GetUserId(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

			var course = _mapper.Map<CourseReadModel, Course>(courseReadModel);
			try
			{
				var courseId = _courseEditor.AddOrUpdateCourse(course);
				_courseEditor.AttachTeacherToCourse(courseId, userId);

				return new JsonResult(courseId);
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateCourseException(_logger, e, course);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/deletecourse")]
		public ActionResult DeleteCourse([FromBody]CourseReadModel course)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

			try
			{
				_courseEditor.DeleteCourse(course.Id);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogDeleteCourseException(_logger, e, course.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpGet]
		[Route("/getusercourses")]
		public ActionResult GetUserCourses()
		{
			var userId = SessionHelper.GetUserId(HttpContext);
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.User.ToString())
			{
				return new BadRequestResult();
			}

			try
			{
				var userCourses = _courseReader.GetUserCourses(userId);
				var userCoursesViewModels = userCourses.Select(_mapper.Map<UserCourse, UserCourseViewModel>).ToList();

				return new JsonResult(userCoursesViewModels);
			}
			catch (Exception e)
			{
				_logService.AddLogGetUserCoursesException(_logger, e, userId);

				return new StatusCodeResult(500);
			}
		}

		[HttpGet]
		[Route("/getcoursesforteacher")]
		public ActionResult GetCoursesForTeacher()
		{
			var role = SessionHelper.GetRole(HttpContext);
			var userId = SessionHelper.GetUserId(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}
			try
			{
				var courses = _courseReader.GetCoursesForTeacher(userId);
				var courseViewModels = courses.Select(_mapper.Map<Course, CourseViewModel>).ToList();

				return new JsonResult(courseViewModels);
			}
			catch (Exception e)
			{
				_logService.AddLogGetCoursesForTeacherException(_logger, e, userId);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/getusersbycourse")]
		public ActionResult GetUsersByCourse([FromBody]CourseReadModel course)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

			try
			{
				var users = _courseReader.GetUsersByCourse(course.Id);
				var userViewModels = users.Select(_mapper.Map<UserCourse, UserCourseViewModel>).ToList();

				return new JsonResult(userViewModels);
			}
			catch (Exception e)
			{
				_logService.AddLogGetUsersByCourseException(_logger, e, course.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/addorupdateparticipantslist")]
		public ActionResult AddOrUpdateParticipantsList([FromBody]CourseReadModel course)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

			try
			{
				_courseEditor.AddOrUpdateParticipantsList(course.ParticipantsIds, course.Id);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateParticipantsListException(_logger, e, course.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/getcoursesinfo")]
		public ActionResult GetCoursesInfo([FromBody]CoursesInfoQueryReadModel queryReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			try
			{
				var query = _mapper.Map<CoursesInfoQueryReadModel, CoursesInfoQuery>(queryReadModel);
				var courses = _courseReader.GetCoursesByQuery(query);
				var courseViewModels = courses.Select(_mapper.Map<Course, CourseViewModel>).ToList();

				return new JsonResult(courseViewModels);
			}
			catch (Exception e)
			{
				_logService.AddLogGetCoursesInfoException(_logger, e);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/addorupdateusercoursedetails")]
		public ActionResult AddOrUpdateUserCourseDetails([FromBody]UserCourseReadModel userCourseReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

			try
			{
				var userCourse = _mapper.Map<UserCourseReadModel, UserCourse>(userCourseReadModel);
				_courseEditor.AddOrUpdateUserCourse(userCourse);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateUserCourseDetails(_logger, e, userCourseReadModel.CourseId, userCourseReadModel.UserId);

				return new StatusCodeResult(500);
			}
		}
	}
}