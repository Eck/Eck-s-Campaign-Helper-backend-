const raceSelectAllStatement = "SELECT RaceID, RaceName FROM Race WHERE RaceID > 0";
const raceSelectSingleStatement = "SELECT RaceID, RaceName FROM Race WHERE RaceID = ?";
const raceSelectAllNonRandomStatement = "SELECT RaceID, RaceName FROM Race WHERE RaceID > 0";

// Simple data model that holds a race selection
export default class Race
{
	constructor(raceID, raceName)
	{
		this.RaceID = raceID;
		this.RaceName = raceName;
	}
	
	static createDefault()
	{
		return new this(null, "");
	}

	static staticCreateFromRow(row)
	{
		return new this(row.RaceID, row.RaceName);
	}

	createFromRow(row)
	{
		return Race.staticCreateFromRow(row);
	}

	getSelectAllStatement()
	{
		return raceSelectAllStatement;
	}

	getSelectSingleStatement()
	{
		return raceSelectSingleStatement;
	}

	getPrimaryKey()
	{
		return this.RaceID;
	}

	setPrimaryKey(primaryKey)
	{
		this.RaceID = primaryKey;
	}
}

const EMPTY_RACE = Object.freeze(Race.createDefault());

export {Race, EMPTY_RACE, raceSelectAllNonRandomStatement}