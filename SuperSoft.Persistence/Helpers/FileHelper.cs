using System.IO;
using Microsoft.AspNetCore.Http;

namespace SuperSoft.Persistence.Helpers
{
	public static class FileHelper
	{
		public static byte[] GetBytes(IFormFile file)
		{
			byte[] fileBytes;
			using (var memoryStream = new MemoryStream())
			{
				file.CopyTo(memoryStream);
				fileBytes = memoryStream.ToArray();
			}

			return fileBytes;
		}

		public static void SaveContent(byte[] fileBytes, string path)
		{
			System.IO.File.WriteAllBytes(path, fileBytes);
		}
		
		public static void AppendContent(byte[] fileBytes, string path, int offset)
		{
			if (offset > 100)
			{
				offset -= 100;
			}
			using (var stream = new FileStream(path, FileMode.Append))
			{
				stream.Write(fileBytes, 0, fileBytes.Length);
			}
		}
	}
}