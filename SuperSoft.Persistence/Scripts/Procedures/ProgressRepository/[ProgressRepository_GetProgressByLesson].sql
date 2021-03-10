CREATE PROCEDURE [dbo].[ProgressRepository_GetProgressByLesson]	
	@lessonId INT
AS
BEGIN
	DECLARE @subtaskIds TABLE ([Id] INT);
	DECLARE @answerGroupIds TABLE ([Id] INT);
	DECLARE @courseId INT = (
		SELECT TOP 1
		[CourseId] 
		FROM [Lesson_Course]
		WHERE [LessonId] = @lessonId
	);
	
	DECLARE @userIds TABLE ([Id] INT);

	INSERT
	INTO @userIds (
		[Id]
	)
	SELECT
		[UserId]
	FROM [User_Course]
	WHERE [CourseId] = @courseId;

	DECLARE @userCount INT = (SELECT COUNT(*) FROM @userIds);

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
	WHERE [lc].[CourseId] = @courseId
		AND [lt].[LessonId] = @lessonId;

	DECLARE @completedSubtasks INT = (
		SELECT COUNT(*)
		FROM [User_Subtask] 
		WHERE [SubtaskId] IN (SELECT [Id] FROM @subtaskIds)
			AND [Status] = 4
			AND [UserId] IN (SELECT [Id] FROM @userIds)
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
			AND [UserId] IN (SELECT [Id] FROM @userIds)
		);

	DECLARE @allUserSubtaskGroups INT = (
		SELECT COUNT(*)
		FROM @answerGroupIds
	);

	DECLARE @progress FLOAT;
	IF (@allSubtasks + @allUserSubtaskGroups > 0)
		SET @progress = (CAST(@completedSubtasks AS FLOAT) + CAST(@completedUserSubtaskGroups AS FLOAT)) / (CAST(@allSubtasks * @userCount AS FLOAT) + CAST(@allUserSubtaskGroups * @userCount AS FLOAT))
	ELSE
		SET @progress = 0;

	SELECT @progress * 100;
END