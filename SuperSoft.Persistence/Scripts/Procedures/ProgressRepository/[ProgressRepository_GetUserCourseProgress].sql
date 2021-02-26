﻿CREATE PROCEDURE [ProgressRepository_GetUserCourseProgress]
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

	DECLARE @allSubtasks INT = (
		SELECT COUNT(*)
		FROM [User_Subtask] 
		WHERE [SubtaskId] IN (SELECT [Id] FROM @subtaskIds)
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

	DECLARE @allUserSubtaskGroups INT = (
		SELECT COUNT(*)
		FROM [User_SubtaskAnswerGroup] 
		WHERE [AnswerGroupId] IN (SELECT [Id] FROM @answerGroupIds)
		);
	DECLARE @progress FLOAT;
	IF (@allSubtasks + @allUserSubtaskGroups > 0)
		SET @progress = (CAST(@completedSubtasks AS FLOAT) + CAST(@completedUserSubtaskGroups AS FLOAT)) / (CAST(@allSubtasks AS FLOAT) + CAST(@allUserSubtaskGroups AS FLOAT))
	ELSE
		SET @progress = 0;

	SELECT @progress * 100;
END