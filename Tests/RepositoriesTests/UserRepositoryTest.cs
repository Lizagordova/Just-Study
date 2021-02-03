using NUnit.Framework;
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
			var user = new User();
			var userId = _userRepository.AddOrUpdateUser(user);
			var result = userId != 0;
			Assert.That(result == true);
		}
	}
}