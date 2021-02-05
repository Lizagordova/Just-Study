CREATE PROCEDURE [LessonRepository_DeleteLesson]
	@lessonId INT
AS
BEGIN
	DELETE
	FROM [Lesson]
	WHERE [Id] = @lessonId;

END