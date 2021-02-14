CREATE PROCEDURE [CourseRepository_DeleteUserFromCourse]
	@userId INT,
	@courseId INT
AS
BEGIN
	DELETE
	FROM [User_Course]
	WHERE [UserId] = @userId
		AND [CourseId] = @courseId;
		/*todo: мб здесь ещё нужен courseRole в будущем */
END