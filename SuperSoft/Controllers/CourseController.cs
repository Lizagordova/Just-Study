using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;

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
				_logService.AddLogGAddOrUpdateCourseException(_logger, e, course);

				return new StatusCodeResult(500);
			}
		}
	}
}