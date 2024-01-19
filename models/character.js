const characterSelectAllStatement = "SELECT * FROM CharacterID";
const characterSelectSingleStatement = "SELECT * FROM Character WHERE CharacterID = ?";
const characterInsertStatement = "INSERT INTO Character (CharacterName, RaceID, ClassID, GenderID, OtherNotes, DescriptionInteractionID) VALUES (?, ?, ?, ?, ?, ?)";

class Character
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
		return new this(null, "", 0, 0, 0, "", null);
	}

	static createFromCharacter(characterToCopy)
	{
		let character = Character.createDefault();

		if(characterToCopy == null)
			return character;

		character.CharacterID = characterToCopy.CharacterID;
		character.CharacterName = characterToCopy.CharacterName;
		character.RaceID = characterToCopy.RaceID;
		character.ClassID = characterToCopy.ClassID;
		character.GenderID = characterToCopy.GenderID;
		character.OtherNotes = characterToCopy.OtherNotes;
		character.DescriptionInteractionID = characterToCopy.DescriptionInteractionID;

		return character;
	}

	getInsertStatement()
	{
		return characterInsertStatement;
	}

	getInsertValues()
	{
		let insertValues = [this.CharacterName, this.RaceID, this.ClassID, this.GenderID, this.OtherNotes, this.DescriptionInteractionID];
		return insertValues;
	}	

	getPrimaryKey()
	{
		return this.CharacterID;
	}

	setPrimaryKey(primaryKey)
	{
		this.CharacterID = primaryKey;
	}
}

const EMPTY_CHARACTER = Object.freeze(Character.createDefault());

export {Character, EMPTY_CHARACTER}
