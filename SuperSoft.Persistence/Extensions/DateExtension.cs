using System;

namespace SuperSoft.Persistence.Extensions
{
	public static class DateExtension
	{
		public static DateTime GetDayFromDate(this DateTime date)
		{
			date =  DateTime.Parse(date.ToShortDateString());

			return date;
		}
	}
}