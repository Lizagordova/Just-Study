using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class UserViewModel
	{
		public int Id { get; set; }
		public string Login { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string PasswordHash { get; set; }
		public UserRole Role { get; set; }
		public string Token { get; set; }
	}
}