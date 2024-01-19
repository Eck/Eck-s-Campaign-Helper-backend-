const genderSelectAllStatement = "SELECT GenderID, GenderName FROM Gender";
const genderSelectSingleStatement = "SELECT GenderID, GenderName FROM Gender WHERE GenderID = ?";
const genderSelectAllNonRandomStatement = "SELECT GenderID, GenderName FROM Gender WHERE GenderID > 0";

// Simple data model that holds a gender selection
export default class Gender
{
	constructor(genderID, genderName)
	{
		this.GenderID = genderID;
		this.GenderName = genderName;
	}
	
	static createDefault()
	{
		return new this(null, "");
	}

	static staticCreateFromRow(row)
	{
		return new this(row.GenderID, row.GenderName);
	}

	createFromRow(row)
	{
		return Gender.staticCreateFromRow(row);
	}

	getSelectAllStatement()
	{
		return genderSelectAllStatement;
	}

	getSelectSingleStatement()
	{
		return genderSelectSingleStatement;
	}

	getPrimaryKey()
	{
		return this.GenderID;
	}

	setPrimaryKey(primaryKey)
	{
		this.GenderID = primaryKey;
	}
}

const EMPTY_GENDER = Object.freeze(Gender.createDefault());

export {Gender, EMPTY_GENDER, genderSelectAllStatement, genderSelectAllNonRandomStatement}