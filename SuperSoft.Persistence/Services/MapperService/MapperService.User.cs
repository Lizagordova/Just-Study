using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateUserMappings()
		{
			AddMapping<User, UserUdt>(cfg =>
			{
				cfg.CreateMap<User, UserUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(dest => dest.Id))
					.ForMember(dest => dest.FirstName, opt => opt.MapFrom(dest => dest.FirstName))
					.ForMember(dest => dest.LastName, opt => opt.MapFrom(dest => dest.LastName))
					.ForMember(dest => dest.Email, opt => opt.MapFrom(dest => dest.Email))
					.ForMember(dest => dest.Role, opt => opt.MapFrom(dest => dest.Role))
					.ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(dest => dest.PasswordHash));
			});

			AddMapping<User, UserUdt>(cfg =>
			{
				cfg.CreateMap<User, UserUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(dest => dest.Id))
					.ForMember(dest => dest.FirstName, opt => opt.MapFrom(dest => dest.FirstName))
					.ForMember(dest => dest.LastName, opt => opt.MapFrom(dest => dest.LastName))
					.ForMember(dest => dest.Email, opt => opt.MapFrom(dest => dest.Email))
					.ForMember(dest => dest.Role, opt => opt.MapFrom(dest => dest.Role))
					.ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(dest => dest.PasswordHash));
			});
		}
	}
}