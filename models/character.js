export default class Character
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
}

const EMPTY_CHARACTER = Object.freeze(Character.createDefault());

export {Character, EMPTY_CHARACTER}
