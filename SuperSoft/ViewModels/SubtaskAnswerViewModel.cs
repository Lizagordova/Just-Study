using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class SubtaskAnswerViewModel
	{
		public int Id { get; set; }
		public string Answer { get; set; }
		public bool IsRight { get; set; }
		public bool IsInfinitive { get; set; }
		public string Explanation { get; set; }
	}
}