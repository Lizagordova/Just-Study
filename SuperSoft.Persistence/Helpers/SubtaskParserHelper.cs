using System.Collections.Generic;
using System.Text.RegularExpressions;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;

namespace SuperSoft.Persistence.Helpers
{
	public static class SubtaskParserHelper
	{
		private static readonly Regex _verbFormPattern = new Regex(@"\[(\w*?\D*?)\]");
		private static readonly Regex _fillGapsFormPattern = new Regex(@"\[(\w*?\D*?)\]");
		private static readonly Regex _explanationPattern = new Regex(@"\((w*?\D*?)\)");

		public static MatchCollection GetAnswerGroupsMatchCollection(string text, SubtaskType subtaskType)
		{
			switch (subtaskType)
			{
				case SubtaskType.RightVerbForm:
					return _verbFormPattern.Matches(text);
				case SubtaskType.FillGaps:
					return _fillGapsFormPattern.Matches(text);
				default:
					return null;
			}
		}

		public static SubtaskAnswerGroup GetAnswerGroup(string text, SubtaskType subtaskType)
		{
			switch (subtaskType)
			{
				case SubtaskType.RightVerbForm:
					return GetChooseRightVerbForm(text);
				case SubtaskType.FillGaps:
					return GetFillGapsAnswerGroup(text);
				default:
					return new SubtaskAnswerGroup();
			}
		}
		
		private static SubtaskAnswerGroup GetFillGapsAnswerGroup(string text)
		{
			var answers = text.Replace("[", "").Replace("]", "").Split("/");
			var subtaskAnswers = new List<SubtaskAnswer>();
			for (var i = 0; i < answers.Length; i++)
			{
				var subtaskAnswer = new SubtaskAnswer();
				subtaskAnswer.Explanation = _explanationPattern.Match(answers[i]).Value.Replace("(", "").Replace(")", "");
				subtaskAnswer.Answer = _explanationPattern.Replace(answers[i], "");
				subtaskAnswer.IsRight = i == 1;
				subtaskAnswer.IsInfinitive = i == 0;
				subtaskAnswers.Add(subtaskAnswer);
			}

			return new SubtaskAnswerGroup() {Answers = subtaskAnswers};
		}

		private static SubtaskAnswerGroup GetChooseRightVerbForm(string text)
		{
			var answers = text.Replace("[", "").Replace("]", "").Split("/");
			var subtaskAnswers = new List<SubtaskAnswer>();
			foreach (var answer in answers)
			{
				var subtaskAnswer = new SubtaskAnswer();
				subtaskAnswer.Explanation = _explanationPattern.Match(answer).Value.Replace("(", "").Replace(")", "");
				subtaskAnswer.Answer = _explanationPattern.Replace(answer, "");
				subtaskAnswer.IsRight = subtaskAnswer.Answer.Contains("*");
				subtaskAnswer.Answer = subtaskAnswer.Answer.Replace("*", "");
				subtaskAnswers.Add(subtaskAnswer);
			}

			return new SubtaskAnswerGroup() { Answers = subtaskAnswers };
		}
	}
}