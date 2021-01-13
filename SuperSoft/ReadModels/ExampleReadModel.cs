using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class ExampleReadModel
	{
		public int Id { get; set; }
		public string Example { get; set; }
	}
}