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
				.ExportAsEnum<Tarif>()
				.OverrideNamespace("enums");
			builder
				.ExportAsEnum<CompletingStatus>()
				.OverrideNamespace("enums");
			builder
				.ExportAsEnum<SubtaskType>()
				.OverrideNamespace("enums");
			builder
				.ExportAsEnum<UserRole>()
				.OverrideNamespace("enums");
			builder
				.ExportAsEnum<TaskType>()
				.OverrideNamespace("enums");
			builder
				.ExportAsEnum<CommentedEntityType>()
				.OverrideNamespace("enums");
			builder
				.ExportAsEnum<PartOfSpeech>()
				.OverrideNamespace("enums");
		}
	}
}