CREATE PROCEDURE [LessonRepository_GetLessonById]
	@lessonId INT
AS
BEGIN
	DECLARE @lesson [UDT_Lesson];
	
	INSERT
	INTO @lesson (
		[Id],
		[Name],
		[Description]
	)
	SELECT
		[Id],
		[Name],
		[Description]
	FROM [Lesson]
	WHERE [Id] = @lessonId;

	SELECT * FROM @lesson;
END