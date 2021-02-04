using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface IUserEditorService
	{
		int AddOrUpdateUser(User user);
		void DeleteUser(int userId);
	}
}