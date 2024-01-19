import AIInteraction from '../models/ai-interaction.js';
// This javascript file just pretends to be OpenAI with some stubbed out classes that match how we call the real OpenAI system. 
// The reason I'm making this mock system is because I didn't want to burn through my credits with like an infinite loop bug. :)

// What a series of prompts and responses looks like to the real OpenAI:
//     const completion = await openai.chat.completions.create({
//         messages: [{"role": "system", "content": "You are a helpful assistant."},
//             {"role": "user", "content": "Who won the world series in 2020?"},
//             {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
//             {"role": "user", "content": "Where was it played?"}],
//         model: "gpt-3.5-turbo",
//     });
//
//   console.log(completion.choices[0]);

// I made Mock classes for each bit in the "await openai.chat.completions.create" command. So MockOpenAI, MockChat, MockCompletion. MockCompletion has
// the create method that matches the signature for the class passed in above.
// Seeding our interactions with some data so it can look like a chat bot.
let interactionDict = 
{
	"who won the world series in 2020" : new AIInteraction(null,"Who won the world series in 2020?", "The Los Angeles Dodgers won the World Series in 2020."),
	"where was it played" : new AIInteraction(null,"Where was it played?", "The entire series was played at Globe Life Field in Arlington, Texas.")
};



// Enum that holds the valid roles for a message
const MockRoles = Object.freeze(
{
	none : "none",           // No roll specified
	system : "system",       // Used to specify what kind of assistant the AI should pretend to be.
	assistant : "assistant", // Used for messages written by the AI
	user : "user"            // Used for messages written by the user.
});


// Simple class that holds the role and content. Used for sending/receiving messages to the AI
class MockMessage
{
	constructor(role, content)
	{
		this.role = role;
		this.content = content;
	}
}

// TODO - put these in the database. Just keep em in memory until I create one. Maybe Sqlite, Maybe MySql?
let systemMessage = new MockMessage();
let messages = [];


// The response has a list of choices, but I've only ever seen one so far. Maybe you can ask for more? I'm still a noob.
// Simple class represents a choice returned by the AI.
// A single "choice" looks like this in a chat completion prompt/response.
//     {
//       "finish_reason": "stop",
//       "index": 0,
//       "message": {
//         "content": "The 2020 World Series was played in Texas at Globe Life Field in Arlington.",
//         "role": "assistant"
//       },
//       "logprobs": null
//     }
class MockChoice
{
	constructor(role, content)
	{
		this.message = new MockMessage(role, content);

		// Putting in some bogus data to match what gets returned in happy path.
		this.finish_reason = "stop";
		this.index = 0;
		this.logprobs = null;
	}
}


// This is the class that actually does any work. (well pretend work). 
// A single "completion" looks like this in a chat completion prompt/response.
//     {
//         "choices": [{
//             "finish_reason": "stop",
//             "index": 0,
//             "message": {
//                 "content": "The 2020 World Series was played in Texas at Globe Life Field in Arlington.",
//                 "role": "assistant"
//             },
//         "logprobs": null
//         }],
//         "created": 1677664795,
//         "id": "chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW",
//         "model": "gpt-3.5-turbo-0613",
//         "object": "chat.completion",
//         "usage": {
//             "completion_tokens": 17,
//             "prompt_tokens": 57,
//             "total_tokens": 74
//         }
//     }
class MockCompletion
{
	// The main method for creating a response from the AI
	async create(userPrompt)
	{
		let messages = userPrompt.messages;

		this.messages = [];
		this.systemMessage = null;

		// Create some bogus data for the Completion.create fields.
		this.created = Date.now() / 1000;
		this.id = "MOCK-chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW";
		this.model = "MOCK-" + userPrompt.model;
		this.object = "MockCompletion";
		this.usage = { "completion_tokens": 17, "prompt_tokens": 57, "total_tokens": 74 };

		// If they didn't ask for anything, just return 
		if(!Array.isArray(messages) || messages.length === 0)
		{
			this.choices = [new MockChoice(MockRoles.none, "No information requested")];
			return this;
		}

		// Loop through our messages
		let lastMessage = undefined;
		let lastUserPrompt = undefined;
		let lastAIResponse = undefined;
		let lastInteraction = undefined;

		// So this mock code is a bit dirty. I'll be receiving an alternating list of user prompts and ai responses.
		// I'm not really worried about handling bad data here since I'm in control of everything.
		// This loop goes through the list of prompt/responses and update any responses necessary.
		// If the last bit of data was a userPrompt, we'll look up or create a response and set that
		// as our choice.
		for(let i=0;i<messages.length;++i)
		{
			let message = messages[i];
			lastMessage = message;

			// store the system message in case it's useful
			if(message.role == MockRoles.system)
			{
				systemMessage = message;
			}
			else
			{
				this.messages.push(message);

				// If we're a userPrompt, setup an interaction to hold the response
				if(message.role == MockRoles.user)
				{
					lastUserPrompt = message;
					lastInteraction = this.GetOrCreateInteraction(message.content); 
				}
				// If we have an aiResponse for the previous question, we can set our interaction
				else if(message.role == MockRoles.assistant && lastInteraction)
				{
					lastAIResponse = message;
					lastInteraction.AIResponse = message.content;
					lastInteraction = undefined;
				}
			}
		}

		// If the last message was a prompt from a user, we need to generate a response
		if(lastMessage.role == MockRoles.user)
		{
			let interaction = this.GetOrCreateInteraction(lastMessage.content);
			this.choices = [new MockChoice(MockRoles.assistant, interaction.AIResponse)];
		}
		// Otherwise just return the last message as if it's our response.
		else
		{
			this.choices = [new MockChoice(lastMessage.role, lastMessage.content)];
		}

		return this;
	}

	// takes a user's prompt, strips everything but alpha numeric and reduces spaces.
	ConvertPromptToDictionaryKey(prompt)
	{
		return prompt.replace(/[^\w\s\']|_/g, "")
			.replace(/\s+/g, " ")
			.toLowerCase()
			.trim();
	}

	// Builds an Interaction to hold the user prompt and the AI's response
	GetOrCreateInteraction(prompt)
	{
		let promptKey = this.ConvertPromptToDictionaryKey(prompt);
		if(!interactionDict.hasOwnProperty(promptKey))
		{
			interactionDict[promptKey] = AIInteraction.createFromPrompt(prompt);
		}
		return interactionDict[promptKey];
	}
}

// This class is part of the chain to get to the create method. All it does is hold the completion.
class MockChat 
{
	constructor()
	{
		this.completions = new MockCompletion();
	}
}


// This is the top-level class that pretends to be OpenAI. I'm not implementing EVERYTHING. I'm only implementing, the stuff that I'm using for now.
export default class MockOpenAI 
{
	constructor(openAIParams)
	{
		this.openAIParams = openAIParams;
		this.chat = new MockChat();        
	}
}


//module.exports = MockOpenAI;
//module.exports = {MockOpenAI};
//export default class MockOpenAI;