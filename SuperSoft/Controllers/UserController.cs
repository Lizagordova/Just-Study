using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
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
	}
}