CREATE PROCEDURE [CourseRepository_DeleteCourse]
	@courseId INT
AS
BEGIN
	DELETE
	FROM [Course]
	WHERE [Id] = @courseId;
END