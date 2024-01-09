// This javascript file just pretends to be OpenAI with some stubbed out classes that match how we call the real OpenAI system. 
// The reason I'm making this mock system is because I didn't want to burn through my credits with like an infinite loop bug. :)

// What a code request looks like to the real OpenAI:
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
// A single "choice" looks like this in a chat completion request.
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
// A single "completion" looks like this in a chat completion request.
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
	async create(request)
	{
		let messages = request.messages;

		this.messages = [];
		this.systemMessage = null;

		// Create some bogus data for the Completion.create fields.
		this.created = Date.now() / 1000;
		this.id = "MOCK-chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW";
		this.model = "MOCK-" + request.model;
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
			}

			// TODO - build a list of paired user prompts/chat responses so I can make a more sophisticated mock system.
		}

		// If the last message was a prompt from a user, we need to generate a response
		if(lastMessage.role == MockRoles.user)
		{
			this.choices = [new MockChoice(MockRoles.assistant, "TODO - Generate or lookup a random response.")];
		}
		// Otherwise just return the last message as if it's our response.
		else
		{
			this.choices = [new MockChoice(lastMessage.role, lastMessage.content)];
		}

		return this;
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