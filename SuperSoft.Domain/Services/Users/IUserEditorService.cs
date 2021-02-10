using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Users
{
	public interface IUserEditorService
	{
		User AddOrUpdateUser(User user);
		void DeleteUser(int userId);
	}
}