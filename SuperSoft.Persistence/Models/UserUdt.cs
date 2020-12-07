namespace SuperSoft.Persistence.Models
{
	public class UserUdt
	{
		public int Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public string PasswordHash { get; set; }
		public int Role { get; set; }
	}
}