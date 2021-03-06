﻿using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
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
		[Authorize(Roles = "User,Admin")]
		public ActionResult GetLessonsByCourse([FromBody]CourseReadModel course)
		{
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
		[Authorize(Roles = "Admin")]
		public ActionResult AddOrUpdateLesson([FromBody]LessonReadModel lessonReadModel)
		{
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
		[Authorize(Roles = "Admin")]
		public ActionResult DeleteLesson([FromBody]LessonReadModel lessonReadModel)
		{
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
		[Authorize(Roles = "User,Admin")]
		public ActionResult GetMaterialsByLesson([FromBody]LessonReadModel lessonReadModel)
		{
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
		[Authorize(Roles = "Admin")]
		public ActionResult DeleteMaterial([FromBody]LessonMaterialReadModel lessonMaterial)
		{
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
		[Authorize(Roles = "Admin")]
		public ActionResult AddOrUpdateMaterial([FromForm]LessonMaterialReadModel lessonMaterialReadModel)
		{
			var lessonMaterial = _mapper.Map<LessonMaterialReadModel, LessonMaterial>(lessonMaterialReadModel);
			try
			{
				_lessonEditor.AddOrUpdateMaterial(lessonMaterial, lessonMaterialReadModel.LessonId, lessonMaterialReadModel.File);

				return new OkResult();
			}
			catch (Exception e)
			{
				_lessonEditor.DeleteMaterial(lessonMaterialReadModel.LessonId, lessonMaterialReadModel.File);//todo: это лучше улучшить
				_logService.AddLogAddOrUpdateMaterialException(_logger, e, lessonMaterial);

				return new StatusCodeResult(500);
			}
		}
		
		[HttpPost]
		[Route("/addorupdatematerial1")]
		[Authorize(Roles = "Admin")]
		public ActionResult AddOrUpdateMaterial1([FromForm]LessonMaterialReadModel lessonMaterialReadModel)
		{

			var lessonMaterial = _mapper.Map<LessonMaterialReadModel, LessonMaterial>(lessonMaterialReadModel);
			try
			{
				_lessonEditor.AddOrUpdateMaterial1(lessonMaterial, lessonMaterialReadModel.LessonId, lessonMaterialReadModel.File, lessonMaterialReadModel.Offset, lessonMaterialReadModel.FileName);

				return new OkResult();
			}
			catch (Exception e)
			{
				//_lessonEditor.DeleteMaterial(lessonMaterialReadModel.LessonId, lessonMaterialReadModel.File);
				_logService.AddLogAddOrUpdateMaterialException(_logger, e, lessonMaterial);

				return new StatusCodeResult(500);
			}
		}
		
		[HttpPost]
		[Route("/updatelessons")]
		[Authorize(Roles = "Admin")]
		public ActionResult UpdateLessons([FromBody]LessonsCollectionReadModel lessonsCollection)
		{
			var lessons = lessonsCollection.Lessons.Select(_mapper.Map<LessonReadModel, Lesson>).ToList();
			try
			{
				_lessonEditor.UpdateLessons(lessons, lessonsCollection.CourseId);
			}
			catch (Exception e)
			{
				_logService.AddLogUpdateLessonsException(_logger, e);
				
				return new StatusCodeResult(500);
			}

			return new OkResult();
		}
	}
}