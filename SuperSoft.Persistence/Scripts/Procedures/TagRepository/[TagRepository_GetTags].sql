CREATE PROCEDURE [TagRepository_GetTags]
AS
BEGIN
	DECLARE @tags [UDT_Tag];
	DECLARE @subtags [UDT_Subtag];

	INSERT
	INTO @tags (
		[Id],
		[Name]
	)
	SELECT
		[Id],
		[Name]
	FROM [Tag];

	INSERT
	INTO @subtags (
		[Id],
		[TagId],
		[Name]
	)
	SELECT
		[s].[Id],
		[st].[TagId],
		[s].[Name]
	FROM [Subtag] AS [s]
	JOIN [Subtag_Tag] AS [st]
	ON [s].[Id] = [st].[SubtagId];

	SELECT * FROM @tags;
	SELECT * FROM @subtags;
END