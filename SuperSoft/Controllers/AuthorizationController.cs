using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Services.Users;
using SuperSoft.Helpers;
using SuperSoft.Persistence.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace SuperSoft.Controllers
{
	public class AuthorizationController : Controller
	{
		private readonly MapperService _mapper;
		private readonly IUserReaderService _userReader;
		private readonly IUserEditorService _userEditor;
		private readonly ILogger<AuthorizationController> _logger;
		private readonly LogService _logService;
		private readonly IOptions<AuthOptions> authOptions;

		public AuthorizationController(
			MapperService mapper,
			IUserReaderService userReader,
			IUserEditorService userEditor,
			ILogger<AuthorizationController> logger,
			LogService logService,
			IOptions<AuthOptions> authOptions)
		{
			_mapper = mapper;
			_userReader = userReader;
			_userEditor = userEditor;
			_logger = logger;
			_logService = logService;
			this.authOptions = authOptions;
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
		[Authorize(Roles = "User")]
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

		[Route("/login")]
		[HttpPost]
		public IActionResult Login([FromBody]UserReadModel request)
		{
			var user = AuthenticateUser(request.Email, request.Password);

			if (user != null)
			{
				var token = GenerateJWT(user);

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
		
		private Account AuthenticateUser(string email, string password)
		{
			var userInfo =  _userReader.GetUserInfo(new UserInfoQuery() { PasswordHash = password.GetPasswordHash(), Email = email, Login = email });
			if (userInfo == null)
			{
				return null;
			}
			return new Account
			{
				Id = userInfo.Id,
				Email = userInfo.Email,
				Roles = new UserRole[] { UserRole.User }
			};
		}

		private string GenerateJWT(Account user)
		{
			var authParams = authOptions.Value;

			var securityKey = authParams.GetSymmetricSecurityKey();
			var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

			var claims = new List<Claim>()
			{
				new Claim(JwtRegisteredClaimNames.Email, user.Email),
				new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString())
			};

			foreach (var role in user.Roles)
			{
				claims.Add(new Claim("role", role.ToString()));
			}
            
			var token = new JwtSecurityToken(authParams.Issuer,
				authParams.Audience,
				claims,
				expires: DateTime.Now.AddSeconds(authParams.TokenLifeTime),
				signingCredentials: credentials);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}