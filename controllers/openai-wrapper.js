
// This function asks a question to openai, and logs the response to the console
async function generateChatPrompt(openAI, userPrompt)
{
	let completion = await openAI.chat.completions.create
	({
		messages: 
		[
			{"role": "user", "content": userPrompt}
		],
		model: "gpt-3.5-turbo",
	});
	
	console.log(userPrompt);
	console.log(completion.choices[0]);
	console.log("");

	return completion.choices[0].message.content;
}

export {generateChatPrompt}