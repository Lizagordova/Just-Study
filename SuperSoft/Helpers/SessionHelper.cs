using Microsoft.AspNetCore.Http;

namespace SuperSoft.Helpers
{
	public static class SessionHelper
	{
		public static int GetUserId(HttpContext context)
		{
			return int.Parse(context.Request.Cookies["userId"]);
		}

		public static string GetToken(HttpContext context)
		{
			return context.Request.Cookies["token"];
		}
	}
}