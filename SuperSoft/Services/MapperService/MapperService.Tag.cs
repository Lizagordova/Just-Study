using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.ViewModels;

namespace SuperSoft.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateTagMappings()
		{
			AddMapping<TagReadModel, Tag>(cfg =>
			{
				cfg.CreateMap<TagReadModel, Tag>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
			});

			AddMapping<Tag, TagViewModel>(cfg =>
			{
				cfg.CreateMap<Tag, TagViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Subtags, opt => opt.Ignore())
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
			});

			AddMapping<SubtagReadModel, Subtag>(cfg =>
			{
				cfg.CreateMap<SubtagReadModel, Subtag>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
			});

			AddMapping<Subtag, SubtagViewModel>(cfg =>
			{
				cfg.CreateMap<Subtag, SubtagViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
			});
		}
	}
}