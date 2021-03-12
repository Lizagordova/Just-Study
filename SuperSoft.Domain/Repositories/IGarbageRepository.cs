namespace SuperSoft.Domain.Repositories
{
	public interface IGarbageRepository
	{
		void FileToDelete(string path);
	}
}