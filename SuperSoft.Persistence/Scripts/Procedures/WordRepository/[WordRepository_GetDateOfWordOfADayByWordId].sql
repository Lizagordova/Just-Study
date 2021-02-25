CREATE PROCEDURE [WordRepository_GetDateOfWordOfADayByWordId]
	@wordId INT
AS
BEGIN
	DECLARE @date DATETIME = (
		SELECT
			TOP 1 [Date]
		FROM [WordOfADay]
		WHERE [WordId] = @wordId
		);
	
	SELECT @date;
END