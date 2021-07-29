using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Authorization
{
    public interface IAuthorizationService
    {
        Account AuthenticateUser(string email, string password);
        string GenerateJwt(Account user);
    }
}