CREATE TABLE [TrackerWhole]
(
	[TrackerId] INT REFERENCES [Tracker]([Id]) ON DELETE CASCADE,
	[TrackerByDayId] INT REFERENCES [TrackerByDay]([Id]) ON DELETE CASCADE
);