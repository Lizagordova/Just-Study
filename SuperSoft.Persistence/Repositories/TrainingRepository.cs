using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models.Data;
using SuperSoft.Persistence.Models.Dto;
using SuperSoft.Persistence.Services.MapperService;

namespace SuperSoft.Persistence.Repositories
{
	public class TrainingRepository : ITrainingRepository
	{
		private readonly MapperService _mapper;
		private const string GetTasksSp = "TrainingRepository_GetTasks";
		public TrainingRepository(
			MapperService mapper)
		{
			_mapper = mapper;
		}

		public IReadOnlyCollection<Task> GetTasks(TrainingTaskQuery query)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetGetTasksParam(query);
			var response = conn.QueryMultiple(GetTasksSp, param, commandType: CommandType.StoredProcedure);
			var data = GetTaskData(response);
			var tasks = MapTaskCollection(data);
			DatabaseHelper.CloseConnection(conn);

			return tasks;
		}

		private DynamicTvpParameters GetGetTasksParam(TrainingTaskQuery query)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("tagIds", "UDT_Integer");
			var udt = query.TagIds.Select(tId => new IntegerUdt() { Id = tId });
			tvp.AddGenericList(udt);
			param.Add(tvp);

			return param;
		}

		private TaskData GetTaskData(SqlMapper.GridReader reader)
		{
			var taskData = new TaskData
			{
				Tasks = reader.Read<TaskUdt>().ToList(),
				Subtasks = reader.Read<SubtaskUdt>().ToList(),
				Tags = reader.Read<TagUdt>().ToList()
			};

			return taskData;
		}

		private IReadOnlyCollection<Task> MapTaskCollection(TaskData taskData)
		{
			var tasks = taskData.Tasks
				.GroupJoin(
					taskData.Subtasks,
					t => t.Id,
					s => s.TaskId,
					MapTaskWithSubtasks)
				.GroupJoin(taskData.Tags,
					task => task.Id,
					tag => tag.TaskId,
					MapTaskWithTags)
				.ToList();

			return tasks;
		}

		private Task MapTaskWithSubtasks(TaskUdt taskUdt, IEnumerable<SubtaskUdt> subtaskUdts)
		{
			var task = _mapper.Map<TaskUdt, Task>(taskUdt);
			task.Subtasks = subtaskUdts.Select(_mapper.Map<SubtaskUdt, Subtask>).ToList();

			return task;
		}

		private Task MapTaskWithTags(Task task, IEnumerable<TagUdt> tagUdts)
		{
			task.Tags = tagUdts.Select(_mapper.Map<TagUdt, Tag>).ToList();

			return task;
		}
	}
}