using Microsoft.AspNetCore.Http;

namespace SuperSoft.Helpers
{
	public static class SessionHelper
	{
		public static string GetRole(HttpContext context)
		{
			return context.Request.Cookies["role"];
		}

		public static string Authorized(HttpContext context)
		{
			return context.Session.GetString("authorized");
		}

		public static int GetUserId(HttpContext context)
		{
			return (int) context.Session.GetInt32("userId");
		}

		public static string GetToken(HttpContext context)
		{
			return context.Request.Cookies["token"];
		}
	}
}