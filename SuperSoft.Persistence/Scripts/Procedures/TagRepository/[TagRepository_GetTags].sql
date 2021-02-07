CREATE PROCEDURE [TagRepository_GetTags]
AS
BEGIN
	DECLARE @tags [UDT_Tag];

	INSERT
	INTO @tags (
		[Id],
		[Name]
	)
	SELECT
		[Id],
		[Name]
	FROM [Tag];

	SELECT * FROM @tags;
END