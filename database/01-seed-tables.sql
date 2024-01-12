-- This file will hold the schema/table layout for the database

CREATE TABLE IF NOT EXISTS Race
(
	RaceID INTEGER PRIMARY KEY,
	RaceName TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS Class
(
	ClassID INTEGER PRIMARY KEY,
	ClassName TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Gender
(
	GenderID INTEGER PRIMARY KEY,
	GenderName TEXT NOT NULL
);

-- I started thinking about color for skins, hairs, etc. But then I wanted to get fancy with the random generation, like limiting hair colors for various races.
-- Like blue or green hair for a human isn't a default random choice, but if you were a sea elf, that might be totally natural. Long story short, I have enough
-- other bits of randomness to get a veritcal slice of functionality without adding in this complexity.
-- CREATE TABLE IF NOT EXISTS Color
-- (
-- 	ColorID INTEGER PRIMARY KEY,
-- 	ColorName TEXT NOT NULL
-- );

CREATE TABLE IF NOT EXISTS AIInteraction
(
	AIInteractionID INTEGER PRIMARY KEY,
	UserPrompt TEXT NOT NULL,
	AIResponse BLOB NOT NULL DEFAULT '{"finish_reason": "stop","index": 0,"message": { "content": "Waiting for response...", "role": "assistant" }, "logprobs": null }'
);

CREATE TABLE IF NOT EXISTS [Character]
(
	CharacterID INTEGER PRIMARY KEY,
	CharacterName TEXT NOT NULL,
	RaceID INTEGER NOT NULL,
	ClassID INTEGER NOT NULL,
	GenderID INTEGER NOT NULL,
	-- SkinColorID INTEGER NOT NULL,
	-- HairColorID INTEGER NOT NULL,
	-- EyeColorID INTEGER NOT NULL,
	OtherNotes TEXT NOT NULL,
	DescriptionInteractionID NULL,
	
	FOREIGN KEY(RaceID) REFERENCES Race(RaceID),
	FOREIGN KEY(ClassID) REFERENCES Class(ClassID),
	FOREIGN KEY(GenderID) REFERENCES Gender(GenderID),
	FOREIGN KEY(DescriptionInteractionID) REFERENCES AIInteraction(AIInteractionID)
	-- ,
	-- FOREIGN KEY(SkinColorID) REFERENCES Color(ColorID),
	-- FOREIGN KEY(HairColorID) REFERENCES Color(ColorID),
	-- FOREIGN KEY(EyeColorID) REFERENCES Color(ColorID)
);

