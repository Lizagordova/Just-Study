using Microsoft.AspNetCore.Mvc;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Helpers;
using SuperSoft.Services;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class AuthorizationController : Controller
	{
		private readonly MapperService _mapper;
		private readonly IUserReaderService _userReader;

		public AuthorizationController(
			MapperService mapper,
			IUserReaderService userReader)
		{
			_mapper = mapper;
			_userReader = userReader;
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
		
		//todo: реализовать registation and authorization
	}
}