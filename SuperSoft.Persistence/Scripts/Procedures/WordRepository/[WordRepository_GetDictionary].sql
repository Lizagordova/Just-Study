CREATE PROCEDURE [WordRepository_GetDictionary]
AS
BEGIN
	DECLARE @words [UDT_Word];
	DECLARE @examples [UDT_Example];

	INSERT
	INTO @words (
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
	FROM [Word];

	INSERT
	INTO @examples (
		[Id],
		[WordId],
		[Example]
	)
	SELECT
		[ex].[Id],
		[we].[WordId],
		[ex].[Example]
	FROM [Example] AS [ex]
	JOIN [Word_Example] AS [we]
	ON [ex].[Id] = [we].[ExampleId];

	SELECT * FROM @words;
	SELECT * FROM @examples;
END