const aiInteractionSelectAllStatement = "SELECT AIInteractionID, UserPrompt, AIResponse FROM AIInteraction";
const aiInteractionSelectSingleStatement = "SELECT AIInteractionID, UserPrompt, AIResponse FROM AIInteraction WHERE AIInteractionID = ?";
const aiInteractionInsertStatement = "INSERT INTO AIInteraction (UserPrompt, AIResponse) VALUES (?, ?)";
const aiInteractionUpdateStatement = "UPDATE AIInteraction SET UserPrompt = ?, AIResponse = ? WHERE AIInteractionID = ?";

// Simple data model that holds a user's prompt, and what the AI responded with.
export default class AIInteraction
{
	constructor(aiInteractionID, UserPrompt, AIResponse)
	{
		this.AIInteractionID = aiInteractionID;
		this.UserPrompt = UserPrompt;
		this.AIResponse = AIResponse;
	}
	
	static createDefault()
	{
		return new this(null, "", "");
	}

	static createFromPrompt(UserPrompt)
	{
		return new this(null, UserPrompt, "Waiting for response...");
	}

	static staticCreateFromRow(row)
	{
		return new this(row.AIInteractionID, row.UserPrompt, row.AIResponse);
	}

	createFromRow(row)
	{
		return AIInteraction.staticCreateFromRow(row);
	}

	getSelectAllStatement()
	{
		return aiInteractionSelectAllStatement;
	}

	getSelectSingleStatement()
	{
		return aiInteractionSelectSingleStatement;
	}

	getInsertStatement()
	{
		return aiInteractionInsertStatement;
	}

	getInsertValues()
	{
		let insertValues = [this.UserPrompt, this.AIResponse];
		return insertValues;
	}

	getUpdateStatement()
	{
		return aiInteractionUpdateStatement;
	}

	getUpdateValues()
	{
		let updateValues = [this.UserPrompt, this.AIResponse, this.AIInteractionID];
		return updateValues;
	}

	getPrimaryKey()
	{
		return this.AIInteractionID;
	}

	setPrimaryKey(primaryKey)
	{
		this.AIInteractionID = primaryKey;
	}
}


const EMPTY_AI_INTERACTION = AIInteraction.createDefault();

export {AIInteraction, EMPTY_AI_INTERACTION}