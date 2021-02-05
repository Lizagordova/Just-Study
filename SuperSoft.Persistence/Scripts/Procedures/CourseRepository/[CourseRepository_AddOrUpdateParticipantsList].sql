CREATE PROCEDURE [CourseRepository_AddOrUpdateParticipantsList]
	@participants [UDT_User_Course] READONLY
AS
BEGIN
	MERGE
	INTO [User_Course] AS [dest]
	USING @participants AS [src]
	ON [dest].[UserId] = [src].[UserId]
		AND [dest].[CourseId] = [src].[CourseId]
		AND [dest].[CourseRole] = [src].[CourseRole]
	WHEN NOT MATCHED THEN
		INSERT (
			[UserId],
			[CourseId],
			[Tarif],
			[StartDate],
			[ExpireDate],
			[CourseRole]
		) VALUES (
			[src].[UserId],
			[src].[CourseId],
			[src].[Tarif],
			[src].[StartDate],
			[src].[ExpireDate],
			[src].[CourseRole]
		)
	WHEN MATCHED THEN
		UPDATE
		SET
			[dest].[UserId] = [src].[UserId],
			[dest].[CourseId] = [src].[CourseId],
			[dest].[Tarif] = [src].[Tarif],
			[dest].[StartDate] = [src].[StartDate],
			[dest].[ExpireDate] = [src].[ExpireDate],
			[dest].[CourseRole] = [src].[CourseRole];
END