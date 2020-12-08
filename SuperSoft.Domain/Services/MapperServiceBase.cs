using System;
using System.Collections.Generic;
using AutoMapper;

namespace SuperSoft.Domain.Services
{
	public abstract class MapperServiceBase
	{
		private Dictionary<(Type, Type), IMapper> _mappers;
		public MapperServiceBase()
		{
			_mappers = new Dictionary<(Type, Type), IMapper>();
			CreateMappings();
		}

		protected abstract void CreateMappings();

		protected void AddMapping<TSource, TDestination>()
		{
			var mapper = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<TSource, TDestination>();
				})
				.CreateMapper();

			_mappers.Add((typeof(TSource), typeof(TDestination)), mapper);
		}

		protected void AddMapping<TSource, TDestination>(Action<IMapperConfigurationExpression> action)
		{
			var mapper = new MapperConfiguration(cfg =>
				{
					action(cfg);
				})
				.CreateMapper();

			_mappers.Add((typeof(TSource), typeof(TDestination)), mapper);
		}

		public TDestination Map<TSource, TDestination>(TSource source)
		{
			var key = (typeof(TSource), typeof(TDestination));
			if (!_mappers.ContainsKey(key))
			{
				throw new Exception("Something wrong with mapper");
			}

			return _mappers[key].Map<TDestination>(source);
		}

		public object Map(object source, Type sourceType, Type destinationType)
		{
			var key = (sourceType, destinationType);
			if (!_mappers.ContainsKey(key))
			{
				throw new Exception("Something wrong with mapper");
			}

			return _mappers[key].Map(source, sourceType, destinationType);
		}
	}
}