using NUnit.Framework;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Persistence.Repositories;
using SuperSoft.Persistence.Services.MapperService;

namespace Tests.RepositoriesTests
{
	[TestFixture]
	public class UserRepositoryTest
	{
		private readonly UserRepository _userRepository;
		public UserRepositoryTest()
		{
			var mapperService = new MapperService();
			_userRepository = new UserRepository(mapperService);
		}

		[Test]
		public void AddOrUpdateUser_Scenario_ExpectedResult()
		{
			var user = new User()
			{
				FirstName = "Mashs",
				LastName = "Gordova",
				Email = "lizunchik_737@mail.ru",
				Login = "lizagordova",
				PasswordHash = "123456",
				Role = UserRole.Admin,
				Token = "1234556"
			};
			var userId = _userRepository.AddOrUpdateUser(user);
			var result = userId != 0;
			Assert.That(result == true);
		}
		
		[Test]
		public void GetUserInfo_Scenario_ExpectedResult()
		{
			var user = _userRepository.GetUserInfo(1);
			var result = user != null;
			Assert.That(result == true);
		}

		[Test]
		public void GetUsers_Scenario_ExpectedResult()
		{
			var users = _userRepository.GetUsers();
			var result = users != null;
			Assert.That(result == true);
		}
		
		[Test]
		public void DeleteUser_Scenario_ExpectedResult()
		{
			_userRepository.DeleteUser(1);
			Assert.That(true);
		}
	}
}