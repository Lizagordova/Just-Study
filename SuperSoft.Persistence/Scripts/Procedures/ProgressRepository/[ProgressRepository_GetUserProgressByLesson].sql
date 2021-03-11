CREATE PROCEDURE [ProgressRepository_GetUserProgressByLesson]
	@userId INT,
	@lessonId INT
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
	WHERE [lt].[LessonId] = @lessonId;

	DECLARE @completedSubtasks INT = (
		SELECT COUNT(*)
		FROM [User_Subtask] 
		WHERE [SubtaskId] IN (SELECT [Id] FROM @subtaskIds)
			AND [Status] = 4
			AND [UserId] = @userId
		);

	DECLARE @allSubtasks INT = (
		SELECT COUNT(*)
		FROM @subtaskIds
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
			AND [UserId] = @userId
		);

	DECLARE @allUserSubtaskGroups INT = (
		SELECT COUNT(*)
		FROM @answerGroupIds
		);

	DECLARE @progress FLOAT;
	IF (@allSubtasks + @allUserSubtaskGroups > 0)
		SET @progress = (CAST(@completedSubtasks AS FLOAT) + CAST(@completedUserSubtaskGroups AS FLOAT)) / (CAST(@allSubtasks AS FLOAT) + CAST(@allUserSubtaskGroups AS FLOAT))
	ELSE
		SET @progress = 0;

	SELECT @progress * 100;
END