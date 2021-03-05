CREATE PROCEDURE [TaskRepository_DeleteTaskFromLesson]	
	@taskId INT,
	@lessonId INT
AS
BEGIN
	DELETE
	FROM [Lesson_Task]
	WHERE [LessonId] = @lessonId
		AND [TaskId] = @taskId;
END