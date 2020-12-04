using System;
using Reinforced.Typings;
using Reinforced.Typings.Ast;
using Reinforced.Typings.Generators;

namespace SuperSoft.Configuration.Typings.Generators
{
	public class ApiViewModelClassCodeGenerator : ClassCodeGenerator
	{
		public override RtClass GenerateNode(Type element, RtClass result, TypeResolver resolver)
		{
			base.GenerateNode(element, result, resolver);

			foreach(var member in result.Members)
			{
				var field = member as RtField;
				if (field != null && field.Type.ToString().Contains("[]"))
				{
					field.InitializationExpression = "[]";
				}
			}

			return result;
		}
	}
}