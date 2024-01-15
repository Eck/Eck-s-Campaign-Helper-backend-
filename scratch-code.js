import AIInteraction from "./models/ai-interaction.js"
import * as DataBase from "./database/initdatabase.js"

// This file is what I plan to use to execute random bits of code as I start putting new systems in place.


// Testing AI Interaction inserts.
let aiInteraction = AIInteraction.createFromPrompt("What is a weasel?");
console.log(JSON.stringify(aiInteraction));


let insertedAIInteraction = await DataBase.insertData(aiInteraction);
console.log(JSON.stringify(aiInteraction));
console.log(JSON.stringify(insertedAIInteraction));