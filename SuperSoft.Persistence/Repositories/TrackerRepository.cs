using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models.Data;
using SuperSoft.Persistence.Models.Dto;
using SuperSoft.Persistence.Services.MapperService;

namespace SuperSoft.Persistence.Repositories
{
	public class TrackerRepository : ITrackerRepository
	{
		private readonly MapperService _mapper;
		private const string AddOrUpdateTrackerSp = "TrackerRepository_AddOrUpdateTracker";
		private const string GetTrackerSp = "TrackerRepository_GetTracker";
		private const string AddOrUpdateTrackersByDaySp = "TrackerRepository_AddOrUpdateTrackersByDay";

		public TrackerRepository(
			MapperService mapper)
		{
			_mapper = mapper;
		}

		public int AddOrUpdateTracker(Tracker tracker)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateTrackerParam(tracker);
			var trackerId = conn.Query(AddOrUpdateTrackerSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return trackerId;
		}

		public void AddOrUpdateTrackersByDay(IReadOnlyCollection<TrackerByDay> trackersByDay, int trackerId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateTrackersByDayParam(trackersByDay, trackerId);
			conn.Query(AddOrUpdateTrackersByDaySp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public Tracker GetTracker(int userId, int courseId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetGetTrackerParam(userId, courseId);
			var response = conn.QueryMultiple(GetTrackerSp, param, commandType: CommandType.StoredProcedure);
			var data = GetTrackerData(response);
			var tracker = MapTracker(data);
			DatabaseHelper.CloseConnection(conn);

			return tracker;
		}

		private DynamicTvpParameters GetAddOrUpdateTrackerParam(Tracker tracker)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("tracker", "UDT_Tracker");
			var udt = _mapper.Map<Tracker, TrackerUdt>(tracker);
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}

		private DynamicTvpParameters GetAddOrUpdateTrackersByDayParam(IReadOnlyCollection<TrackerByDay> trackerByDays, int trackerId)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("trackersByDay", "UDT_TrackerByDay");
			var udt = trackerByDays.Select(_mapper.Map<TrackerByDay, TrackerByDayUdt>);
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);
			param.Add("trackerId", trackerId);

			return param;
		}

		private DynamicTvpParameters GetGetTrackerParam(int userId, int courseId)
		{
			var param = new DynamicTvpParameters();
			param.Add("userId", userId);
			param.Add("courseId", courseId);

			return param;
		}

		private TrackerData GetTrackerData(SqlMapper.GridReader reader)
		{
			var data = new TrackerData()
			{
				Tracker = reader.Read<TrackerUdt>().FirstOrDefault(),
				TrackersByDay = reader.Read<TrackerByDayUdt>().ToList()
			};

			return data;
		}

		private Tracker MapTracker(TrackerData data)
		{
			var tracker = _mapper.Map<TrackerUdt, Tracker>(data.Tracker);
			tracker.TrackersByDay = data.TrackersByDay.Select(_mapper.Map<TrackerByDayUdt, TrackerByDay>).ToList();

			return tracker;
		}
	}
}