CREATE PROCEDURE [WordRepository_AddOrUpdateWordOfDay]
	@wordId INT,
	@date DATETIME2,
	@courseId INT
AS
BEGIN
	DECLARE @wordOfADay INT = (
		SELECT [WordId]
		FROM [WordOfADay]
		WHERE [Date] = @date
			AND [CourseId] = @courseId
		);

	IF @wordOfADay IS NULL
		BEGIN
			INSERT
			INTO [WordOfADay] (
				[WordId],
				[CourseId],
				[Date]
			)
			VALUES (
				@wordId,
				@courseId,
				@date
			);
		END
	ELSE	
		BEGIN
			UPDATE [WordOfADay]
			SET [WordId] = @wordId
			WHERE [CourseId] = @courseId
				AND [Date] = @date;
		END
END