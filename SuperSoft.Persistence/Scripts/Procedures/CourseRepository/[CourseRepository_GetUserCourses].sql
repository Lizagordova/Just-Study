CREATE PROCEDURE [CourseRepository_GetUserCourses]
	@userId INT,
	@role INT
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
	WHERE [UserId] = @userId
		AND [CourseRole] = @role;

	SELECT * FROM @userCourses;
END