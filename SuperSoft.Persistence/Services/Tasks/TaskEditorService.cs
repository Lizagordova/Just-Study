using System.Text.RegularExpressions;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Tasks;
using SuperSoft.Persistence.Helpers;

namespace SuperSoft.Persistence.Services.Tasks
{
	public class TaskEditorService : ITaskEditorService
	{
		private readonly ITaskRepository _taskRepository;

		public TaskEditorService(
			ITaskRepository taskRepository)
		{
			_taskRepository = taskRepository;
		}

		public int AddOrUpdateTask(Task task)
		{
			var taskId = _taskRepository.AddOrUpdateTask(task);

			return taskId;
		}

		public void AttachTaskToLesson(int taskId, int lessonId, int order)
		{
			_taskRepository.AttachTaskToLesson(taskId, lessonId, order);
		}

		public int AddOrUpdateSubtask(Subtask taskSubtask, int taskId)
		{
			var subtaskId = _taskRepository.AddOrUpdateSubtask(taskSubtask, taskId);
			taskSubtask.Id = subtaskId;
			var subtask = PreHandleSubtask(taskSubtask, taskId);
			subtaskId = _taskRepository.AddOrUpdateSubtask(subtask, taskId);

			return subtaskId;
		}

		public void DeleteTask(int taskId)
		{
			_taskRepository.DeleteTask(taskId);
		}

		public void DeleteSubtask(int subtaskId)
		{
			_taskRepository.DeleteSubtask(subtaskId);
		}

		private Subtask PreHandleSubtask(Subtask subtask, int taskId)
		{
			var subtaskType = subtask.SubtaskType;
			if (subtaskType == SubtaskType.FillGaps || subtaskType == SubtaskType.RightVerbForm || subtaskType == SubtaskType.InsertWordsIntoGaps)
			{
				AddOrUpdateAnswerGroups(subtask);
			}

			if (subtaskType == SubtaskType.DetailedAnswer || subtaskType == SubtaskType.LoadAudio || subtaskType == SubtaskType.LoadFile)
			{
				if (subtask.File != null)
				{
					var bytes = FileHelper.GetBytes(subtask.File);
					var path = GetPath(taskId, subtask.File.FileName);
					FileHelper.SaveContent(bytes, path);
					subtask.Path = path;
				}
			}
			return subtask;
		}

		private void AddOrUpdateAnswerGroups(Subtask subtask)
		{
			var groups = SubtaskParserHelper.GetAnswerGroupsMatchCollection(subtask.Text, subtask.SubtaskType);
			foreach (Match group in groups)
			{
				var answerGroup = SubtaskParserHelper.GetAnswerGroup(group.Value, subtask.SubtaskType);
				var groupId = _taskRepository.AddOrUpdateAnswerGroup(subtask.Id, answerGroup);//todo: довольно опасная штука, особенно если 2 раза добавлять
				subtask.Text = subtask.Text.Replace(group.Value, $@"[{groupId}]");
			}
		}

		private string GetPath(int taskId, string fileName)
		{
			var path = "";
			if (fileName.Contains("jpg") || fileName.Contains("jpeg") || fileName.Contains("png"))
			{
				path = PathHelper.GetTaskImagePath(taskId);
			}
			else
			{
				path = PathHelper.GetTaskPath(taskId);
			}
			path = $"{path}/{fileName}";

			return path;
		}
	}
}