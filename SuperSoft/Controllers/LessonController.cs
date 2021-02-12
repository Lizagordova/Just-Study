using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services.Lessons;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class LessonController : Controller
	{
		private readonly MapperService _mapper;
		private readonly ILessonEditorService _lessonEditor;
		private readonly ILessonReaderService _lessonReader;
		private readonly ILogger<LessonController> _logger;
		private readonly LogService _logService;

		public LessonController(
			MapperService mapperService,
			ILessonEditorService lessonEditor,
			ILessonReaderService lessonReader,
			ILogger<LessonController> logger,
			LogService logService)
		{
			_mapper = mapperService;
			_lessonEditor = lessonEditor;
			_lessonReader = lessonReader;
			_logger = logger;
			_logService = logService;
		}

		[HttpPost]
		[Route("/getlessonsbycourse")]
		public ActionResult GetLessonsByCourse([FromBody]CourseReadModel course)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			try
			{
				var lessons = _lessonReader.GetLessonsByCourse(course.Id);
				var lessonsViewModels = lessons.Select(_mapper.Map<Lesson, LessonViewModel>).ToList();

				return new JsonResult(lessonsViewModels);
			}
			catch (Exception e)
			{
				_logService.AddLogGetLessonsByCourseException(_logger, e, course.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/addorupdatelesson")]
		public ActionResult AddOrUpdateLesson([FromBody]LessonReadModel lessonReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

			var lesson = _mapper.Map<LessonReadModel, Lesson>(lessonReadModel);
			try
			{
				_lessonEditor.AddOrUpdateLesson(lesson, lessonReadModel.CourseId);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateLessonException(_logger, e, lesson, lessonReadModel.CourseId);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/deletelesson")]
		public ActionResult DeleteLesson([FromBody]LessonReadModel lessonReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

			try
			{
				_lessonEditor.DeleteLesson(lessonReadModel.Id);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogDeleteLessonException(_logger, e, lessonReadModel.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/getmaterialsbylesson")]
		public ActionResult GetMaterialsByLesson([FromBody]LessonReadModel lessonReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

			try
			{
				var materials = _lessonReader.GetMaterialsByLesson(lessonReadModel.Id);
				var materialsViewModels = materials.Select(_mapper.Map<LessonMaterial, LessonMaterialViewModel>).ToList();

				return new JsonResult(materialsViewModels);
			}
			catch (Exception e)
			{
				_logService.AddLogGetMaterialsByLessonException(_logger, e, lessonReadModel.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/deletematerial")]
		public ActionResult DeleteMaterial([FromBody]LessonMaterialReadModel lessonMaterial)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}

			try
			{
				_lessonEditor.DeleteMaterial(lessonMaterial.Id);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogDeleteMaterialException(_logger, e, lessonMaterial.Id);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/addorupdatematerial")]
		public ActionResult AddOrUpdateMaterial([FromForm]LessonMaterialReadModel lessonMaterialReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role != UserRole.Admin.ToString())
			{
				return new BadRequestResult();
			}
			var lessonMaterial = _mapper.Map<LessonMaterialReadModel, LessonMaterial>(lessonMaterialReadModel);
			try
			{
				_lessonEditor.AddOrUpdateMaterial(lessonMaterial, lessonMaterialReadModel.LessonId, lessonMaterialReadModel.File);

				return new OkResult();
			}
			catch (Exception e)
			{
				_lessonEditor.DeleteMaterial(lessonMaterialReadModel.LessonId, lessonMaterialReadModel.File);
				_logService.AddLogAddOrUpdateMaterialException(_logger, e, lessonMaterial);

				return new StatusCodeResult(500);
			}
		}
	}
}