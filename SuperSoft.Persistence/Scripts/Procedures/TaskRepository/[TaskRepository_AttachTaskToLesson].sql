CREATE PROCEDURE [TaskRepository_AttachTaskToLesson]
	@taskId INT,
	@lessonId INT,
	@order INT
AS
BEGIN
	DECLARE @taskExistedId INT = (
		SELECT [TaskId] 
		FROM [Lesson_Task]
		WHERE [TaskId] = @taskId
			AND [lessonId] = @lessonId
		);
	DECLARE @existTaskWithTheOrder INT = (SELECT
		TOP 1 [TaskId] 
		FROM [Lesson_Task] 
		WHERE [Order] = @order
			AND [TaskId] = @taskId
			AND [LessonId] = @lessonId
		);

	IF (@order IS NOT NULL AND @existTaskWithTheOrder IS NOT NULL)
		OR (@order != (SELECT [Order] FROM [Lesson_Task] WHERE [TaskId] = @taskId AND [LessonId] = @lessonId))
		UPDATE [Lesson_Task]
		SET
			[Order] = [Order] + 1
		WHERE [Order] >= @order
			AND [TaskId] = @taskId
			AND [LessonId] = @lessonId;

	IF @taskExistedId IS NOT NULL
		INSERT
		INTO [Lesson_Task] (
			[TaskId],
			[LessonId],
			[Order]
		) VALUES (
			@taskId,
			@lessonId,
			@order
		)
	ELSE
		UPDATE [Lesson_Task]
		SET
		 [Order] = @order
		 WHERE [TaskId] = @taskId
			AND [LessonId] = @lessonId;

END