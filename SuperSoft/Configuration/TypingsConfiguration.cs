using Reinforced.Typings.Fluent;
using SuperSoft.Domain.enums;

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

			builder
				.ExportAsEnum<TaskRole>()
				.OverrideNamespace("enums");
			builder
				.ExportAsEnum<ProjectRole>()
				.OverrideNamespace("enums");
			builder
				.ExportAsEnum<Role>()
				.OverrideNamespace("enums");
			builder
				.ExportAsEnum<TaskStatus>()
				.OverrideNamespace("enums");
			builder
				.ExportAsEnum<TaskType>()
				.OverrideNamespace("enums");
			builder
				.ExportAsEnum<TaskPriority>()
				.OverrideNamespace("enums");
		}
	}
}