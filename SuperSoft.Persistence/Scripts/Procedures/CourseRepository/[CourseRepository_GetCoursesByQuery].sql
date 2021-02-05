CREATE PROCEDURE [CourseRepository_GetCoursesByQuery]
	@coursesIds [UDT_Integer] READONLY
AS
BEGIN
	DECLARE @courses [UDT_Course];

	INSERT
	INTO @courses(
		[Id],
		[Name],
		[Description]
	)
	SELECT
		[Id],
		[Name],
		[Description]
	FROM [Course]
	WHERE [Id] IN (SELECT [Id] FROM @coursesIds);

	SELECT * FROM @courses;
END