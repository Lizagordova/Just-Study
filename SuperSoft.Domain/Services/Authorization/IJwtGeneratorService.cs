using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Authorization
{
    public interface IJwtGeneratorService
    {
        string GenerateJwt(Account user);
        string GenerateJwt(User user);
    }
}