using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class ExampleViewModel
	{
		public int Id { get; set; }
		public string Example { get; set; }
	}
}