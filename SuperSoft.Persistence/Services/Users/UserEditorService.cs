using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Helpers;

namespace SuperSoft.Persistence.Services.Users
{
	public class UserEditorService : IUserEditorService
	{
		private readonly IUserRepository _userRepository;

		public UserEditorService(
			IUserRepository userRepository)
		{
			_userRepository = userRepository;
		}

		public int AddOrUpdateUser(User user)
		{
			user.PasswordHash = user.PasswordHash.GetPasswordHash();
			var userId = _userRepository.AddOrUpdateUser(user);
			return userId;
		}

		public void DeleteUser(int userId)
		{
			//TODO: Надо удалять комменты юзера, потому что это мб потенциальной проблемой
			_userRepository.DeleteUser(userId);
		}
	}
}