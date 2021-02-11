using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Services.Users;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;

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

		[HttpPost]
		[Route("/registration")]
		public ActionResult Registration([FromBody]UserReadModel userReadModel)
		{
			var user = _mapper.Map<UserReadModel, User>(userReadModel);
			try
			{
				var updatedUser = _userEditor.AddOrUpdateUser(user);
				SetUserData(user.Role, updatedUser.Token, updatedUser.Id);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateUserException(_logger, e);
				
				return new StatusCodeResult(500);
			}
		}

		[HttpGet]
		[Route("/checktoken")]
		public ActionResult CheckToken()
		{
			var token = SessionHelper.GetToken(HttpContext);
			var exists = _userReader.CheckToken(token);
			if (exists)
			{
				var user = _userReader.GetUserInfo(new UserInfoQuery() { Token = token });
				SetUserData(user.Role, token, user.Id);

				return new JsonResult(user);
			}

			return new StatusCodeResult(401);
		}

		[HttpPost]
		[Route("/authorization")]
		public ActionResult Authorization([FromBody]UserReadModel userReadModel)
		{
			var user = _mapper.Map<UserReadModel, User>(userReadModel);
			try
			{
				var userInfo = _userReader.GetUserInfo(new UserInfoQuery() { PasswordHash = user.PasswordHash, Email = user.Email, Login = user.Login });
				if (userInfo == null)
				{
					return new StatusCodeResult(401);
				}
				SetUserData(userInfo.Role, userInfo.Token, userInfo.Id);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAuthorizationProblemException(_logger, e, userReadModel.Login);

				return new StatusCodeResult(500);
			}
		}

		[HttpGet]//todo: разобраться потом, как HttpDelete делать fetch-ом
		[Route("/exit")]
		public ActionResult Exit()
		{
			HttpContext.Response.Cookies.Delete("token");
			HttpContext.Response.Cookies.Delete("userId");
			HttpContext.Response.Cookies.Delete("role");
			HttpContext.Response.Cookies.Delete("authorization");

			return new OkResult();
		}

		private void SetUserData(UserRole role, string token, int userId)
		{
			HttpContext.Session.SetInt32("userId", userId);
			HttpContext.Response.Cookies.Append("token", token);
			HttpContext.Response.Cookies.Append("role", role.ToString());
			HttpContext.Session.SetString("authorized", "true");
		}
	}
}