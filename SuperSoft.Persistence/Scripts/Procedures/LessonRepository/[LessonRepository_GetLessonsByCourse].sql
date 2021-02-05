CREATE PROCEDURE [LessonRepository_GetLessonsByCourse]
	@courseId INT
AS
BEGIN
	DECLARE @lessons [UDT_Lesson];
	DECLARE @lessonCourses [UDT_Lesson_Course];

	INSERT
	INTO @lessonCourses (
		[LessonId],
		[CourseId],
		[Order],
		[ExpireDate],
		[StartDate]
	)
	SELECT
		[LessonId],
		[CourseId],
		[Order],
		[ExpireDate],
		[StartDate]
	FROM [Lesson_Course]
	WHERE [CourseId] = @courseId;

	INSERT
	INTO @lessons (
		[Id],
		[Name],
		[Description]
	)
	SELECT
		[Id],
		[Name],
		[Description]
	FROM [Lesson]
	WHERE [Id] IN (
		SELECT [Id]
		FROM @lessonCourses
	);

	SELECT * FROM @lessons;
	SELECT * FROM @lessonCourses;

END