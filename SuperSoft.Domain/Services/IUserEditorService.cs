using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface IUserEditorService
	{
		int AddOrUpdateUser(User user);
	}
}