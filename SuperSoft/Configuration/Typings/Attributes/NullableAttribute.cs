using Reinforced.Typings.Attributes;

namespace SuperSoft.Configuration.Typings.Attributes
{
	public class NullableAttribute : TsPropertyAttribute
	{
		public NullableAttribute()
		{
			ForceNullable = true;
		}
	}
}