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
			throw new System.NotImplementedException();
		}

		public void DeleteUser(int userId)
		{
			throw new System.NotImplementedException();
		}
	}
}