using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateUserMappings()
		{
			AddMapping<User, UserUdt>(cfg =>
			{
				cfg.CreateMap<User, UserUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
					.ForMember(dest => dest.Login, opt => opt.MapFrom(src => src.Login))
					.ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
					.ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
					.ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.PasswordHash))
					.ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))
					.ForMember(dest => dest.Token, opt => opt.MapFrom(src => src.Token));
			});

			AddMapping<UserUdt, User>(cfg =>
			{
				cfg.CreateMap<UserUdt, User>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
					.ForMember(dest => dest.Login, opt => opt.MapFrom(src => src.Login))
					.ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
					.ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
					.ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.PasswordHash))
					.ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))
					.ForMember(dest => dest.Token, opt => opt.MapFrom(src => src.Token));
			});
		}
	}
}