using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Services.Authorization;
using SuperSoft.Domain.Services.Users;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;
using IAuthorizationService = SuperSoft.Domain.Services.Authorization.IAuthorizationService;

namespace SuperSoft.Controllers
{
	public class AuthorizationController : Controller
	{
		private readonly MapperService _mapper;
		private readonly IUserReaderService _userReader;
		private readonly IUserEditorService _userEditor;
		private readonly ILogger<AuthorizationController> _logger;
		private readonly LogService _logService;
		private readonly IAuthorizationService _authorizationService;
		private readonly IJwtGeneratorService _jwtGeneratorService;

		public AuthorizationController(
			MapperService mapper,
			IUserReaderService userReader,
			IUserEditorService userEditor,
			ILogger<AuthorizationController> logger,
			LogService logService,
			IAuthorizationService authorizationService,
			IJwtGeneratorService jwtGeneratorService
			)
		{
			_mapper = mapper;
			_userReader = userReader;
			_userEditor = userEditor;
			_logger = logger;
			_logService = logService;
			_authorizationService = authorizationService;
			_jwtGeneratorService = jwtGeneratorService;
		}

		[HttpPost]
		[Route("/registration")]
		public ActionResult Registration([FromBody]UserReadModel userReadModel)
		{
			var user = _mapper.Map<UserReadModel, User>(userReadModel);
			try
			{
				var updatedUser = _userEditor.AddOrUpdateUser(user);
				SetUserData(updatedUser.Token, user.Id);

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
			_logService.AddTokenInfoLog(_logger, token);
			if (token != null)
			{
				_logService.AddTokenInfoLog(_logger, token, "i am here");
				var user = _userReader.GetUserInfo(new UserInfoQuery { Token = token });
				_logService.AddTokenInfoLog(_logger, token, $"i am here1;Id={user.Id};Email={user.Email};FirstName={user.FirstName}");

				return new JsonResult(user);
			}

			return new StatusCodeResult(401);
		}

		[Route("/login")]
		[HttpPost]
		public IActionResult Login([FromBody]UserReadModel request)
		{
			var user = _authorizationService.AuthenticateUser(request.Login, request.Password);
			if (user != null)
			{
				var token = user.Token;
				SetUserData(token, user.Id);
				return Ok(new
				{
					access_token = token
				});
			}

			return Unauthorized();
		}

		[HttpGet]//todo: разобраться потом, как HttpDelete делать fetch-ом
		[Route("/exit")]
		public ActionResult Exit()
		{
			HttpContext.Response.Cookies.Delete("token");
			HttpContext.Response.Cookies.Delete("authorization");
			HttpContext.Response.Cookies.Delete("userId");

			return new OkResult();
		}

		private void SetUserData(string token, int userId)
		{
			HttpContext.Response.Cookies.Append("token", token);
			HttpContext.Response.Cookies.Append("userId", userId.ToString());
		}
	}
}