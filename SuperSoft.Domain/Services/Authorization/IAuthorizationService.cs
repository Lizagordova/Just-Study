using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Authorization
{
    public interface IAuthorizationService
    {
        User AuthenticateUser(string login, string password);
    }
}