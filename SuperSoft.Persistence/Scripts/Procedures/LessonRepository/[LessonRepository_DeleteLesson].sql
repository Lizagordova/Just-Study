CREATE PROCEDURE [LessonRepository_DeleteLesson]
	@lessonId INT
AS
BEGIN
	DECLARE @courseId INT = (
		SELECT TOP 1 [CourseId] 
		FROM [Lesson_Course]
		WHERE [LessonId] = @lessonId);
	DECLARE @order INT = (
		SELECT TOP 1 [Order] 
		FROM [Lesson_Course]
		WHERE [LessonId] = @lessonId
			AND [CourseId] = @courseId
		);

	DELETE
	FROM [Lesson]
	WHERE [Id] = @lessonId;

	UPDATE [Lesson_Course]
	SET [Order] = [Order] - 1
	WHERE [CourseId] = @courseId
		AND [Order] = @order;
END