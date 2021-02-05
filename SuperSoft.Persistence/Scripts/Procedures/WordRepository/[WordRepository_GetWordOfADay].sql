CREATE PROCEDURE [WordRepository_GetWordOfADay]
	@date DATETIME2,
	@courseId INT
AS
BEGIN
	DECLARE @word [UDT_Word];
	DECLARE @examples [UDT_Example];

	DECLARE @wordId INT = (
		SELECT [WordId] 
		FROM [WordOfADay] 
		WHERE [CourseId] = @courseId 
			AND [Date] = @date
	);

	INSERT
	INTO @word (
		[Id],
		[Word],
		[EnglishMeaning],
		[RussianMeaning],
		[PartOfSpeech]
	)
	SELECT
		[Id],
		[Word],
		[EnglishMeaning],
		[RussianMeaning],
		[PartOfSpeech]
	FROM [Word]
	WHERE [Id] = @wordId;

	INSERT
	INTO @examples (
		[Id],
		[WordId],
		[Example]
	)
	SELECT
		[ex].[Id],
		@wordId,
		[ex].[Example]
	FROM [Example] AS [ex]
	JOIN [Word_Example] AS [we]
	ON [ex].[Id] = [we].[ExampleId]
	WHERE [we].[WordId] = @wordId;

	SELECT * FROM @word;
	SELECT * FROM @examples;
END