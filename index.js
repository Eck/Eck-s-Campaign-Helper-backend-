import {config} from "dotenv";
import {OpenAI} from "openai";

config();

let openAIParams = {};
openAIParams.apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI(openAIParams);

async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{"role": "system", "content": "You are a helpful assistant."},
//         {"role": "user", "content": "Who won the world series in 2020?"}],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
}

await main();

console.log("Hello World!");