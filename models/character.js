export default class character
{
	constructor(characterID, characterName, raceID, classID, genderID, otherNotes, descriptionInteractionID)
	{
		this.CharacterID = characterID;
		this.CharacterName = characterName;
		this.RaceID = raceID;
		this.ClassID = classID;
		this.GenderID = genderID;
		this.OtherNotes = otherNotes;
		this.DescriptionInteractionID = descriptionInteractionID;
	}

	static createDefault()
	{
		this.CharacterID = null;
		this.CharacterName = "";
		this.RaceID = 0;
		this.ClassID = 0;
		this.GenderID = 0;
		this.OtherNotes = 0;
		this.DescriptionInteractionID = null;
	}
}

/*
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
*/