CREATE PROCEDURE [LessonRepository_GetLessonMaterial]
	@materialId INT
AS
BEGIN
	DECLARE @lessonsMaterial [UDT_Lesson_Material];

	INSERT
	INTO @lessonsMaterial (
		[Id],
		[LessonId],
		[Path],
		[Url]
	)
	SELECT
		[Id],
		[LessonId],
		[Path],
		[Url]
	FROM [Lesson_Material]
	WHERE [Id] = @materialId;
	
	SELECT * FROM @lessonsMaterial;
END