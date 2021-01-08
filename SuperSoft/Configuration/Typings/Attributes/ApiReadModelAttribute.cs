using Reinforced.Typings.Attributes;

namespace SuperSoft.Configuration.Typings.Attributes
{
	public class ApiReadModelAttribute : TsClassAttribute
	{
		public ApiReadModelAttribute()
		{
			Namespace = "readModels";
			AutoExportMethods = true;
		}
	}
}