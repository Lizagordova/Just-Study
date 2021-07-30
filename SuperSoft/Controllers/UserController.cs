using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services.Users;
using SuperSoft.Helpers;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class UserController : Controller
	{
		private readonly IUserReaderService _userReader;
		private readonly IUserEditorService _userEditor;
		private readonly ILogger<UserController> _logger;
		private readonly LogService _logService;
		private readonly MapperService _mapper;

		public UserController (
			IUserReaderService userReader,
			IUserEditorService userEditor,
			ILogger<UserController> logger,
			LogService logService,
			MapperService mapper)
		{
			_userReader = userReader;
			_userEditor = userEditor;
			_logger = logger;
			_logService = logService;
			_mapper = mapper;
		}

		[HttpPost]
		[Authorize(Roles = "User,Admin")]
		[Route("/addorupdateuser")]
		public ActionResult AddOrUpdateUser([FromBody]UserReadModel userReadModel)
		{
			try
			{
				var user = _mapper.Map<UserReadModel, User>(userReadModel);
				_userEditor.AddOrUpdateUser(user);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateUserException(_logger, e);

				return new StatusCodeResult(500);
			}
		}

		[HttpGet]
		[Authorize(Roles="Admin")]
		[Route("/getusers")]
		public ActionResult GetUsers()
		{
			try
			{
				var users = _userReader.GetUsers();
				var usersViewModels = users.Select(_mapper.Map<User, UserViewModel>).ToList();

				return new JsonResult(usersViewModels);
			}
			catch (Exception e)
			{
				_logService.AddLogAddOrUpdateUserException(_logger, e);

				return new StatusCodeResult(500);
			}
		}

		[HttpPost]
		[Authorize(Roles = "Admin")]
		[Route("/deleteuser")]
		public ActionResult DeleteUser([FromBody]UserReadModel userReadModel)
		{
			try
			{
				_userEditor.DeleteUser(userReadModel.Id);

				return new OkResult();
			}
			catch (Exception e)
			{
				_logService.AddLogDeleteUserException(_logger, e, userReadModel.Id);

				return new StatusCodeResult(500);
			}
		}
	}
}