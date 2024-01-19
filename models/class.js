const classSelectAllStatement = "SELECT ClassID, ClassName FROM Class";
const classSelectSingleStatement = "SELECT ClassID, ClassName FROM Class WHERE ClassID = ?";
const classSelectAllNonRandomStatement = "SELECT ClassID, ClassName FROM Class WHERE ClassID > 0";

// Simple data model that holds a class selection
export default class Class
{
	constructor(classID, className)
	{
		this.ClassID = classID;
		this.ClassName = className;
	}
	
	static createDefault()
	{
		return new this(null, "");
	}

	static staticCreateFromRow(row)
	{
		return new this(row.ClassID, row.ClassName);
	}

	createFromRow(row)
	{
		return Class.staticCreateFromRow(row);
	}

	getSelectAllStatement()
	{
		return classSelectAllStatement;
	}

	getSelectSingleStatement()
	{
		return classSelectSingleStatement;
	}

	getPrimaryKey()
	{
		return this.ClassID;
	}

	setPrimaryKey(primaryKey)
	{
		this.ClassID = primaryKey;
	}
}

const EMPTY_CLASS = Object.freeze(Class.createDefault());

export {Class, EMPTY_CLASS, classSelectAllStatement, classSelectAllNonRandomStatement}