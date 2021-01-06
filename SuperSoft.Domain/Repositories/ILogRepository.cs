using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface ILogRepository
	{
		void AddLog(Log log);
	}
}