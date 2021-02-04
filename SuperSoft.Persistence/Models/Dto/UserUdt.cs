using SuperSoft.Domain.enums;

namespace SuperSoft.Persistence.Models.Dto
{
	public class UserUdt
	{
		public int Id { get; set; }
		public string Login { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string PasswordHash { get; set; }
		public int Role { get; set; }
		public string Token { get; set; }
		public string Email { get; set; }
	}
}