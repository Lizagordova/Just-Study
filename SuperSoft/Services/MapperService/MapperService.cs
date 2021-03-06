﻿using SuperSoft.Domain.Services;

namespace SuperSoft.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		protected override void CreateMappings()
		{
			CreateCommentMappings();
			CreateCourseMappings();
			CreateLessonMappings();
			CreateNotificationMappings();
			CreateTaskMappings();
			CreateUserMappings();
			CreateWordMappings();
			CreateTagMappings();
			CreateUserTaskMappings();
			CreateTrackerMappings();
			CreateFeedbackMappings();
		}
	}
}