
// Simple data model that holds a user's prompt, and what the AI responded with.
export default class Interaction
{
	constructor(prompt, response)
	{
		this.prompt = prompt;
		this.response = response;
	}
	
	static CreateEmpty()
	{
		return new this("", "");
	}

	static CreateFromPrompt(prompt)
	{
		return new this(prompt, "Waiting for response...");
	}
}