import {config} from "dotenv";
//import {OpenAI} from "openai";

import MockOpenAI from './controllers/mockopenai.js'

config();

let openAIParams = {};
openAIParams.apiKey = process.env.OPENAI_API_KEY;
// TODO - look up a dependency injection framework later. I just wanted to get some coolness going so we're hardcoding directly to the mock class.
//const openai = new OpenAI(openAIParams);
const openai = new MockOpenAI(openAIParams);

async function main() {

    const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the world series in 2020?"}],
    model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
}

await main();
