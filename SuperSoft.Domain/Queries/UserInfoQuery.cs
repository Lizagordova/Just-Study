namespace SuperSoft.Domain.Queries
{
	public class UserInfoQuery
	{
		public int UserId { get; set; }
		public string Token { get; set; }
		public string Login { get; set; }
		public string PasswordHash { get; set; }
		public string Email { get; set; }
	}
}