using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services.Feedbacks;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class FeedbackController : Controller
	{
		private readonly MapperService _mapper;
		private readonly IFeedbackEditorService _feedbackEditor;
		private readonly IFeedbackReaderService _feedbackReader;
		private readonly ILogger<FeedbackController> _logger;
		private readonly LogService _logService;

		public FeedbackController(
			MapperService mapper,
			IFeedbackEditorService feedbackEditor,
			IFeedbackReaderService feedbackReader,
			ILogger<FeedbackController> logger,
			LogService logService
			)
		{
			_mapper = mapper;
			_feedbackEditor = feedbackEditor;
			_feedbackReader = feedbackReader;
			_logger = logger;
			_logService = logService;
		}

		[HttpPost]
		[Route("/addorupdatefeedback")]
		[Authorize(Roles = "User,Admin")]
		public ActionResult AddFeedback([FromBody]FeedbackReadModel feedbackReadModel)
		{
			var feedback = _mapper.Map<FeedbackReadModel, Feedback>(feedbackReadModel);
			try
			{
				_feedbackEditor.AddFeedback(feedback);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddFeedbackException(_logger, e, feedbackReadModel.Email, feedbackReadModel.Name, feedbackReadModel.Message);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Route("/getfeedbacks")]
		[Authorize(Roles = "User,Admin")]
		public ActionResult GetFeedbacks([FromBody]FeedbackReadModel feedbackReadModel)
		{
			try
			{
				var feedbacks = _feedbackReader.GetFeedbacks(feedbackReadModel.Old);
				var feedbacksViewModels = feedbacks.Select(_mapper.Map<Feedback, FeedbackViewModel>).ToList();

				return new JsonResult(feedbacksViewModels);
			}
			catch (Exception e)
			{
				_logService.AddLogGetFeedbacksException(_logger, e);

				return new StatusCodeResult(500);
			}
		}
	}
}