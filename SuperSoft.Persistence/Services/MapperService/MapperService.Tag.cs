using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateTagMappings()
		{
			AddMapping<Tag, TagUdt>(cfg =>
			{
				cfg.CreateMap<Tag, TagUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
			});

			AddMapping<TagUdt, Tag>(cfg =>
			{
				cfg.CreateMap<TagUdt, Tag>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Subtags, opt => opt.Ignore())
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
			});

			AddMapping<SubtagUdt, Subtag>(cfg =>
			{
				cfg.CreateMap<SubtagUdt, Subtag>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
			});

			AddMapping<Subtag, SubtagUdt>(cfg =>
			{
				cfg.CreateMap<Subtag, SubtagUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.TagId, opt => opt.Ignore())
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
			});
		}
	}
}