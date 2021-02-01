using System.IO;

namespace SuperSoft.Persistence.Helpers
{
	public static class PathHelper
	{
		public static string GetLessonMaterialPath(int lessonId)
		{
			var path = "ClientApp/build/lessons";
			CreateDirectory(path);
			path = $"{path}/{lessonId}";
			CreateDirectory(path);
			path = $"{path}/materials";

			return path;
		}

		private static void CreateDirectory(string path)
		{
			if (!Directory.Exists(path))
			{
				Directory.CreateDirectory(path);
			}
		}
	}
}