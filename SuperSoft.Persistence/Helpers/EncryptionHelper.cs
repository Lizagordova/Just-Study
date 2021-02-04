using System;
using System.Security.Cryptography;
using System.Text;

namespace SuperSoft.Persistence.Helpers
{
	public static class EncryptionHelper
	{
		public static string GetPasswordHash(this string password)
		{
			var sha = new SHA1Managed();
			var hash = sha.ComputeHash(Encoding.UTF8.GetBytes(password));

			return Convert.ToBase64String(hash);
		}
	}
}