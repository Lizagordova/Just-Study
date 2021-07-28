using GemBox.Presentation;
using NUnit.Framework;
using SuperSoft.Persistence.Repositories;
using SuperSoft.Persistence.Services.MapperService;

namespace Tests.RepositoriesTests
{
	public class CommentRepositoryTest
	{
		private readonly CommentRepository _commentRepository;
		public CommentRepositoryTest()
		{
			var mapperService = new MapperService();
			_commentRepository = new CommentRepository(mapperService);
		}

		[Test]
		[TestCase]
		public void AddOrUpdateComment_Scenario_ExpectedResult()
		{
		}
	}
}