using Microsoft.AspNetCore.Mvc;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class UserController : Controller
	{
		public UserController()
		{
			
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