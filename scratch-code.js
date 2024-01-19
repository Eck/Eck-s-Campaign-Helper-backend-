//import express from "express"
import AIInteraction from "./models/ai-interaction.js"
import * as Database from "./database/initdatabase.js"
import MockOpenAI from './controllers/mockopenai.js'
import {Race, EMPTY_RACE, raceSelectAllNonRandomStatement} from "./models/race.js";
import {Class, EMPTY_CLASS, classSelectAllNonRandomStatement} from "./models/class.js";
import {Gender, EMPTY_GENDER, genderSelectAllNonRandomStatement} from "./models/gender.js";
import {Character, EMPTY_CHARACTER} from "./models/character.js";
import {getRandomRace, getRandomClass, getRandomGender, fillInRandomCharacterDetails} from "./controllers/character.js"
import {generateChatPrompt} from "./controllers/openai-wrapper.js"
//const app = new express();

// This file is what I plan to use to execute random bits of code as I start putting new systems in place.


// Setup our openAI 
let openAIParams = {};
openAIParams.apiKey = process.env.OPENAI_API_KEY;
// TODO - look up a dependency injection framework later. I just wanted to get some coolness going so we're hardcoding directly to the mock class.
//const openAI = new OpenAI(openAIParams);
const openAI = new MockOpenAI(openAIParams);

let db = Database.openDatabase();

// let raceList = await Database.executeSelectStatement(db, EMPTY_RACE, raceSelectAllNonRandomStatement);
//console.log(JSON.stringify(raceList));

// let race = await getRandomRace(db);
// console.log(JSON.stringify(race));



// let classList = await Database.executeSelectStatement(db, EMPTY_CLASS, classSelectAllNonRandomStatement);
//console.log(JSON.stringify(classList));

// let charClass = await getRandomClass(db);
// console.log(JSON.stringify(charClass));


//console.log(JSON.stringify(classList));

// let gender = await getRandomGender(db);
// console.log(JSON.stringify(gender));

// let character = Character.createDefault();
// let rolledCharacter = await fillInRandomCharacterDetails(db, character);
// console.log(JSON.stringify(rolledCharacter));

// character.RaceID = 0
// character.ClassID = 1
// rolledCharacter = await fillInRandomCharacterDetails(db, character);
// console.log(JSON.stringify(rolledCharacter));

// character.RaceID = 0
// character.ClassID = 1
// character.OtherNotes = "The character has a scar over his left eye."
// rolledCharacter= await fillInRandomCharacterDetails(db, character);
// console.log(JSON.stringify(rolledCharacter));

	let character = new Character(null, "Ralph", 1, 2, 3, "This is some extra info.", null)
	let generatedDescriptionPrompt = "Write a short character description for a Female Half-Orc Wizard. The character has a scar over their left eye."
	// Insert our AI Interaction
	let aiInteraction = AIInteraction.createFromPrompt(generatedDescriptionPrompt)
	aiInteraction.AIResponse = await generateChatPrompt(openAI, aiInteraction.UserPrompt);
	await Database.insertData(db, aiInteraction);

	console.log(JSON.stringify(aiInteraction));

	// Insert our Character 
	character.DescriptionInteractionID = aiInteraction.AIInteractionID;
	await Database.insertData(db, character);

//res.send(JSON.stringify(character,null,4));

// app.set('db', db); 

// app.use("/", aiInteractionRouter);
// let insertedAIInteraction = await Database.insertData(db, aiInteraction);
// console.log(JSON.stringify(aiInteraction));
// console.log(JSON.stringify(insertedAIInteraction));

// let aiInteraction = AIInteraction.createDefault();
// let aiInteractions = await Database.selectAllData(db, aiInteraction);

//console.log(JSON.stringify(aiInteractions));

// app.listen(3141, () => 
// {
// 	console.log("Listening at http://localhost:3141")
// });

db.close();
