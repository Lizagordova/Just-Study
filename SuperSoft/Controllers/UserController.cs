using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class UserController : Controller
	{
		private readonly MapperService _mapper;
		private readonly IUserReaderService _userReader;
		private readonly IUserEditorService _userEditor;
		public UserController(
			MapperService mapper,
			IUserReaderService userReader,
			IUserEditorService userEditor
			)
		{
			_mapper = mapper;
			_userReader = userReader;
			_userEditor = userEditor;
		}

		[HttpPost]
		[Route("/authorization")]
		public ActionResult Authorization([FromBody]UserReadModel userReadModel)
		{
			var authorized = _userReader.Authorization(userReadModel.Email, userReadModel.Password);
			if (authorized)
			{
				var user = _userReader.GetUserInfoWithAuthorization(userReadModel.Email, userReadModel.Password);
				SetUserData(user);
				return new OkResult();
			}
			else
			{
				return new StatusCodeResult(401);
			}
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

		[HttpGet]
		[Route("/getusers")]
		public ActionResult GetUsers()
		{
			var users = _userReader.GetUsers();
			var userViewModels = users
				.Select(_mapper.Map<User, UserViewModel>)
				.ToList();

			return new JsonResult(userViewModels);
		}

		[HttpPost]
		[Route("/addorupdateuser")]
		public ActionResult AddOrUpdateUser([FromBody]UserReadModel userReadModel)
		{
			var user = _mapper.Map<UserReadModel, User>(userReadModel);
			user.Id = _userEditor.AddOrUpdateUser(user);
			var userViewModel = _mapper.Map<User, UserViewModel>(user);

			return new JsonResult(userViewModel);
		}

		[HttpPost]
		[Route("/deleteuser")]
		public ActionResult DeleteUser([FromBody]UserReadModel userReadModel)
		{
			_userEditor.DeleteUser(userReadModel.Id);

			return new OkResult();
		}

		[HttpGet]
		[Route("/exit")]
		public ActionResult Exit()
		{
			HttpContext.Session.Remove("userId");
			HttpContext.Session.Remove("authorized");
			HttpContext.Session.Remove("role");

			return new OkResult();
		}
		private void SetUserData(User user)
		{
			HttpContext.Session.SetInt32("userId", user.Id);
			HttpContext.Session.SetString("authorized", "true");
			if (!HttpContext.Request.Cookies.ContainsKey("role"))
			{
				HttpContext.Response.Cookies.Append("role", user.Role.ToString());
			}
		}
	}
}