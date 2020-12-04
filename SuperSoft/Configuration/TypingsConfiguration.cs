using Reinforced.Typings.Fluent;

namespace SuperSoft.Configuration
{
	public static class TypingsConfiguration
	{
		public static void Configure(ConfigurationBuilder builder)
		{
			builder.Global(c => c
				.UseModules()
				.CamelCaseForProperties()
				.CamelCaseForMethods()
				.AutoOptionalProperties());
		}
	}
}