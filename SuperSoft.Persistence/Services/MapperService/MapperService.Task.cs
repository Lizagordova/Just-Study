using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateTaskMappings()
		{
			AddMapping<Task, TaskUdt>(cfg =>
			{
				cfg.CreateMap<Task, TaskUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Instruction, opt => opt.MapFrom(src => src.Instruction))
					.ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order))
					.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text));
			});

			AddMapping<Task, TaskUdt>(cfg =>
			{
				cfg.CreateMap<Task, TaskUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Instruction, opt => opt.MapFrom(src => src.Instruction))
					.ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order))
					.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text));
			});
		}
	}
}