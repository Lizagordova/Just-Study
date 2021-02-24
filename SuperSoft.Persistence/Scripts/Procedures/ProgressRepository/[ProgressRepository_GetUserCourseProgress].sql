CREATE PROCEDURE [ProgressRepository_GetUserCourseProgress]
	@userId INT,
	@courseId INT
AS
BEGIN
	DECLARE @subtaskIds TABLE ([Id] INT);
	DECLARE @answerGroupIds TABLE ([Id] INT);

	INSERT
	INTO @subtaskIds (
		[Id]
	)
	SELECT
		[s].[Id]
	FROM [Subtask] AS [s]
	JOIN [Lesson_Task] AS [lt]
	ON [s].[TaskId] = [lt].[TaskId]
	JOIN [Lesson_Course] AS [lc]
	ON [lc].[LessonId] = [lt].[LessonId]
	WHERE [lc].[CourseId] = @courseId;

	DECLARE @completedSubtasks INT = (
		SELECT COUNT(*)
		FROM [User_Subtask] 
		WHERE [SubtaskId] IN (SELECT [Id] FROM @subtaskIds)
			AND [Status] = 4
		);

	DECLARE @notCompletedSubtasks INT = (
		SELECT COUNT(*)
		FROM [User_Subtask] 
		WHERE [SubtaskId] IN (SELECT [Id] FROM @subtaskIds)
			AND [Status] != 4
		);

	INSERT
	INTO @answerGroupIds (
		[Id]
	)
	SELECT
		[Id]
	FROM [SubtaskAnswerGroup]
	WHERE [SubtaskId] IN (
		SELECT [Id]
		FROM @subtaskIds
	);

	DECLARE @completedUserSubtaskGroups INT = (
		SELECT COUNT(*)
		FROM [User_SubtaskAnswerGroup] 
		WHERE [AnswerGroupId] IN (SELECT [Id] FROM @answerGroupIds)
			AND [Status] = 4
		);

	DECLARE @notCompletedUserSubtaskGroups INT = (
		SELECT COUNT(*)
		FROM [User_SubtaskAnswerGroup] 
		WHERE [AnswerGroupId] IN (SELECT [Id] FROM @answerGroupIds)
			AND [Status] != 4
		);

	DECLARE @progress FLOAT;
	IF (@notCompletedSubtasks + @notCompletedUserSubtaskGroups > 0)
		SET @progress = (@completedSubtasks + @completedUserSubtaskGroups) / (@notCompletedSubtasks + @notCompletedUserSubtaskGroups)
	ELSE
		SET @progress = 0;

	SELECT @progress;
END