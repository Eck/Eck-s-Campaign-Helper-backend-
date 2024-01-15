
const aiInteractionInsertStatement = "INSERT INTO AIInteraction (UserPrompt, AIResponse) VALUES (?, ?)";

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


	getInsertStatement()
	{
		return aiInteractionInsertStatement;
	}

	getInsertValues()
	{
		let insertValues = [this.UserPrompt, this.AIResponse];
		return insertValues;
	}

	setPrimaryKey(primaryKey)
	{
		this.AIInteractionID = primaryKey;
	}
}

/*
CREATE TABLE IF NOT EXISTS AIInteraction
(
	AIInteractionID INTEGER PRIMARY KEY,
	UserPrompt TEXT NOT NULL,
	AIResponse BLOB NOT NULL DEFAULT '{"finish_reason": "stop","index": 0,"message": { "content": "Waiting for response...", "role": "assistant" }, "logprobs": null }'
);
*/