using Reinforced.Typings.Attributes;
using SuperSoft.Configuration.Typings.Generators;

namespace SuperSoft.Configuration.Typings.Attributes
{
	public class ApiViewModelAttribute : TsClassAttribute
	{
		public ApiViewModelAttribute()
		{
			Namespace = "viewModels";
			AutoExportProperties = true;
			CodeGeneratorType = typeof(ApiViewModelClassCodeGenerator);
		}
	}
}