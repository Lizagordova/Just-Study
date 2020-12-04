using Reinforced.Typings.Attributes;

namespace SuperSoft.Configuration.Typings.Attributes
{
	public class ApiReadModelAttribute : TsInterfaceAttribute
	{
		public ApiReadModelAttribute()
		{
			Namespace = "readModels";
			AutoExportMethods = true;
		}
	}
}