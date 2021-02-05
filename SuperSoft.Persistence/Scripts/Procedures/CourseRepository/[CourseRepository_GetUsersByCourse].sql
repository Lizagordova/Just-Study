CREATE PROCEDURE [CourseRepository_GetUsersByCourse]
	@courseId INT
AS
BEGIN
	DECLARE @userCourses [UDT_User_Course];

	INSERT
	INTO @userCourses(
		[UserId],
		[CourseId],
		[Tarif],
		[StartDate],
		[ExpireDate],
		[CourseRole]
	)
	SELECT
		[UserId],
		[CourseId],
		[Tarif],
		[StartDate],
		[ExpireDate],
		[CourseRole]
	FROM [User_Course]
	WHERE [CourseId] = @courseId;

	SELECT * FROM @userCourses;
END