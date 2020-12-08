using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.ViewModels;

namespace SuperSoft.Services
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateUserMappings()
		{
			AddMapping<UserReadModel, User>(cfg =>
			{
				cfg.CreateMap<UserReadModel, User>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
					.ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
					.ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
					.ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.Password))
					.ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role));
			});

			AddMapping<User, UserViewModel>(cfg =>
			{
				cfg.CreateMap<User, UserViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
					.ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
					.ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
					.ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.PasswordHash))
					.ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role));
			});
		}
	}
}