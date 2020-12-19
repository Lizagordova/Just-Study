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
			return context.Request.Cookies["authorized"];
		}

		public static int GetUserId(HttpContext context)
		{
			return (int) context.Session.GetInt32("userId");
		}
	}
}