import {config} from "dotenv";
//import {OpenAI} from "openai";
import MockOpenAI from './controllers/mockopenai.js'

// Most of this code should move over to scratch-code.js. It's not really "app" code quite yet.
config();

let openAIParams = {};
openAIParams.apiKey = process.env.OPENAI_API_KEY;
// TODO - look up a dependency injection framework later. I just wanted to get some coolness going so we're hardcoding directly to the mock class.
//const openai = new OpenAI(openAIParams);
const openai = new MockOpenAI(openAIParams);

// This function asks a question to openai, and logs the response to the console
async function askQuestion(question)
{
	let completion = await openai.chat.completions.create
	({
		messages: 
		[
			{"role": "user", "content": question}
		],
		model: "gpt-3.5-turbo",
	});
	console.log(question);
	console.log(completion.choices[0]);
	console.log("");

	return completion;
}

// This function lets us pretend to be the ai and give a response.
async function giveAIResponse(question, response)
{
	let completion = await openai.chat.completions.create
	({
		messages: 
		[
			{"role": "user", "content": question},
			{"role": "assistant", "content": response}
		],
		model: "gpt-3.5-turbo",
	});

	return completion;
}

async function test_openAI() 
{
	// Ask the AI some questions
	await askQuestion("Who won the world series in 2020?");
	await askQuestion("Where was it played");

	// Ask a question it doesnt know (should be waiting for response)
	let userPrompt = "Who played in the world series in 2020?";
	let aiResponse = "The Tampa Bay Rays and the Los Angeles Dodgers";
	await askQuestion(userPrompt);

	// Add some new data into our knowledgebase.
	await giveAIResponse(userPrompt, aiResponse);

	// Now ask the question and see the correct answer
	await askQuestion(userPrompt);
}

await main();
