using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.Services;
using SuperSoft.Services;

namespace SuperSoft.Controllers
{
	public class CourseController : Controller
	{
		private readonly MapperService _mapper;
		private readonly ICourseEditorService _courseEditor;
		private readonly ICourseReaderService _courseReader;
		private readonly ILogger<CourseController> _logger;

		public CourseController(
			MapperService mapper,
			ICourseEditorService courseEditor,
			ICourseReaderService courseReader,
			ILogger<CourseController> logger)
		{
			_mapper = mapper;
			_courseEditor = courseEditor;
			_courseReader = courseReader;
			_logger = logger;
		}
	}
}