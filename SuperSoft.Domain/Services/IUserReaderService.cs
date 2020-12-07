using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface IUserReaderService
	{
		IReadOnlyCollection<User> GetUsers();
	}
}