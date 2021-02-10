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
			CreateDirectory(path);

			return path;
		}

		public static string GetTaskPath(int taskId)
		{
			var path = "ClientApp/build/tasks";
			CreateDirectory(path);
			path = $"{path}/{taskId}";
			CreateDirectory(path);

			return path;
		}

		public static string GetTaskImagePath(int taskId)
		{
			var path = "ClientApp/build/images";
			CreateDirectory(path);
			path =$"{path}/tasks";
			CreateDirectory(path);
			path = $"{path}/{taskId}";
			CreateDirectory(path);

			return path;
		}

		public static string GetLessonImagePath(int lessonId)
		{
			var path = "ClientApp/build/images";
			CreateDirectory(path);
			path =$"{path}/lessons";
			CreateDirectory(path);
			path = $"{path}/{lessonId}";
			CreateDirectory(path);

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