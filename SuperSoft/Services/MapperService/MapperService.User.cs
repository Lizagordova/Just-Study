using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.ViewModels;

namespace SuperSoft.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateUserMappings()
		{
			AddMapping<UserReadModel, User>(cfg =>
			{
				cfg.CreateMap<UserReadModel, User>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Login, opt => opt.MapFrom(src => src.Login))
					.ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))
					.ForMember(dest => dest.Token, opt => opt.MapFrom(src => src.Token))
					.ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
					.ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
					.ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
					.ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.PasswordHash));
			});

			AddMapping<User, UserViewModel>(cfg =>
			{
				cfg.CreateMap<User, UserViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Login, opt => opt.MapFrom(src => src.Login))
					.ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))
					.ForMember(dest => dest.Token, opt => opt.MapFrom(src => src.Token))
					.ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
					.ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
					.ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
					.ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.PasswordHash));
			});
		}
	}
}