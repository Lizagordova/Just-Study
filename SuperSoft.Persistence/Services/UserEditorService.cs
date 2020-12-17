using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services
{
	public class UserEditorService : IUserEditorService
	{
		private readonly IUserRepository _userRepository;

		public UserEditorService(IUserRepository userRepository)
		{
			_userRepository = userRepository;
		}

		public int AddOrUpdateUser(User user)
		{
			return _userRepository.AddOrUpdateUser(user);
		}

		public void DeleteUser(int userId)
		{
			_userRepository.DeleteUser(userId);
		}
	}
}