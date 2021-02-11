using System;
using NUnit.Framework;
using SuperSoft.Domain.Models;
using SuperSoft.Persistence.Repositories;
using SuperSoft.Persistence.Services.MapperService;

namespace Tests.RepositoriesTests
{
	[TestFixture]
	public class CourseRepositoryTest
	{
		private readonly CourseRepository _courseRepository;
		public CourseRepositoryTest()
		{
			var mapperService = new MapperService();
			_courseRepository = new CourseRepository(mapperService);
		}

		[Test]
		public void AddCourse_Scenario_ExpectedResult()
		{
			var course = new Course()
			{
				Id = 3,
				Name = "NaStarte",
				Description = "На старте такой прекрасный курс!"
			};
			var courseId = _courseRepository.AddOrUpdateCourse(course);
			var result = courseId != 0;
			Assert.That(result);
			course.Id = courseId;
			UpdateCourse_Scenario_ExpectedResult(course);
		}

		[Test]
		public void UpdateCourse_Scenario_ExpectedResult(Course course)
		{
			var courseId = _courseRepository.AddOrUpdateCourse(course);
			var result = courseId == course.Id;
			Console.WriteLine(courseId);
			Assert.That(result);
		}

		[Test]
		public void DeleteCourse_Scenario_ExpectedResult()
		{
			_courseRepository.DeleteCourse(1);
			_courseRepository.DeleteCourse(2);
		}
	}
}