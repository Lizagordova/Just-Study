using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services.Feedbacks;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;

namespace SuperSoft.Controllers
{
	public class FeedbackController : Controller
	{
		private readonly MapperService _mapper;
		private readonly IFeedbackEditorService _feedbackEditor;
		private readonly ILogger<FeedbackController> _logger;
		private readonly LogService _logService;

		public FeedbackController(
			MapperService mapper,
			IFeedbackEditorService feedbackEditor,
			ILogger<FeedbackController> logger,
			LogService logService
			)
		{
			_mapper = mapper;
			_feedbackEditor = feedbackEditor;
			_logger = logger;
			_logService = logService;
		}

		[HttpPost]
		[Route("/addfeedback")]
		public ActionResult AddFeedback([FromBody]FeedbackReadModel feedbackReadModel)
		{
			var role = SessionHelper.GetRole(HttpContext);
			if (role == null)
			{
				return new BadRequestResult();
			}

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
	}
}