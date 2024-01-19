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
}

const EMPTY_CHARACTER = Object.freeze(Character.createDefault());

export {Character, EMPTY_CHARACTER}
