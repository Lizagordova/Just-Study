using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
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
			IUserEditorService userEditor)
		{
			_mapper = mapper;
			_userReader = userReader;
			_userEditor = userEditor;
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

		[HttpGet]
		[Route("bundled")]
		public ActionResult GetUser()
		{
			var user = new UserViewModel();
			user.FirstName = "lizonka";
			return new JsonResult(user);
		}
	}
}