using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Authorization
{
    public interface IAuthorizationService
    {
        Account AuthenticateUser(string login, string password);
    }
}