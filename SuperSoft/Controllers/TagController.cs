using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperSoft.Domain.Services.Tags;
using SuperSoft.Services;
using SuperSoft.Services.MapperService;

namespace SuperSoft.Controllers
{
	public class TagController : Controller 
	{
		private readonly MapperService _mapper;
		private readonly ILogger<TagController> _logger;
		private readonly ITagReaderService _tagReader;
		private readonly ITagEditorService _tagEditor;
		private readonly LogService _logService;

		public TagController(
			MapperService mapper,
			ILogger<TagController> logger,
			LogService logService)
		{
			_mapper = mapper;
			_logger = logger;
			_logService = logService;
		}
	}
}