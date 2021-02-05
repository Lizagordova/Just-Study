CREATE PROCEDURE [LessonRepository_GetMaterialsByLesson]
	@lessonId INT
AS
BEGIN
	DECLARE @lessonsMaterials [UDT_Lesson_Material];

	INSERT
	INTO @lessonsMaterials (
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
	WHERE [LessonId] = @lessonId;
	
	SELECT * FROM @lessonsMaterials;
END