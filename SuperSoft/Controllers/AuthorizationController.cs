using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class AuthorizationController : Controller
	{
		private readonly MapperService _mapper;
		private readonly IUserReaderService _userReader;
		private readonly IUserEditorService _userEditor;
		private readonly ILogger<AuthorizationController> _logger;
		private readonly LogService _logService;

		public AuthorizationController(
			MapperService mapper,
			IUserReaderService userReader,
			IUserEditorService userEditor,
			ILogger<AuthorizationController> logger,
			LogService logService)
		{
			_mapper = mapper;
			_userReader = userReader;
			_userEditor = userEditor;
			_logger = logger;
			_logService = logService;
		}

		[HttpGet]
		[Route("/getcurrentuser")]
		public ActionResult GetCurrentUser()
		{
			if (SessionHelper.Authorized(HttpContext) != "true")
			{
				return new StatusCodeResult(401);
			}
			else
			{
				var userId = SessionHelper.GetUserId(HttpContext);
				var user = _userReader.GetUserInfo(userId);
				var userViewModel = _mapper.Map<User, UserViewModel>(user);

				return new JsonResult(userViewModel);
			}
		}

		[HttpPost]
		[Route("/registration")]
		public ActionResult Registration([FromBody]UserReadModel userReadModel)
		{
			var user = _mapper.Map<UserReadModel, User>(userReadModel);
			try
			{
				var userId = _userEditor.AddOrUpdateUser(user);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateUserException(_logger, e);
				
				return new StatusCodeResult(500);
			}
		}
		//todo: реализовать registation and authorization
	}
}