using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class SubtagReadModel
	{
		public int Id { get; set; }
		public int TagId { get; set; }
		public string Name { get; set; }
	}
}