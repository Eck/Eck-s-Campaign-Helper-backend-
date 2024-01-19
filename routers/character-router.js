import * as Database from "../database/initdatabase.js"
import express from "express";
import {Character, EMPTY_CHARACTER} from "../models/character.js"
import {isRequiredParameterPresent, sendSuccessMessage} from "./utility.js"
import { getRandomRace, getRandomClass, getRandomGender, fillInRandomCharacterDetails } from "../controllers/character.js";

// "/character/" is used on the characterRouter in the index.js file.
let characterRouter = express.Router();

characterRouter.get("/random-race", async(req, res)=>{
	let db = req.app.get('db');
	let race = await getRandomRace(db);
	res.send(JSON.stringify(race,null,4));
});

characterRouter.get("/random-class", async(req, res)=>{
	let db = req.app.get('db');
	let charClass = await getRandomClass(db);
	res.send(JSON.stringify(charClass,null,4));
});

characterRouter.get("/random-gender", async(req, res)=>{
	let db = req.app.get('db');
	let gender = await getRandomGender(db);
	res.send(JSON.stringify(gender,null,4));
});

characterRouter.get("/roll", async(req, res)=>{
	let db = req.app.get('db');

	let character = Character.createFromCharacter(req.body);
	let rolledCharacter = await fillInRandomCharacterDetails(db, character);
// 	let userPrompt = req.body.userPrompt;
// 	let aiResponse = req.body.aiResponse;


	res.send(JSON.stringify(rolledCharacter,null,4));
});
// // GET request: Retrieve all characters
// characterRouter.get("/",async (req,res)=>
// {
// 	let db = req.app.get('db');
// 	let characters = await Database.selectAllData(db, EMPTY_CHARACTER);
// 	res.send(JSON.stringify(characters,null,4));
// });

// // GET by specific ID request: Retrieve a single friend with email ID
// characterRouter.get("/:id",async (req,res)=>
// {
//     let id = req.params.id;
// 	let db = req.app.get('db');
// 	let character = await Database.selectSingleData(db, EMPTY_CHARACTER, id);
// 	res.send(JSON.stringify(character,null,4));
// });

// // Create new Characters
// characterRouter.post("/", async (req, res) => {
// 	let userPrompt = req.body.userPrompt;
// 	let aiResponse = req.body.aiResponse;

// 	if(!isRequiredParameterPresent(res, userPrompt, "userPrompt"))
// 	{
// 		return;
// 	}

// 	let character = null;
// 	// If we don't have a response yet, just create an interaction without one.
// 	if(!aiResponse || aiResponse == "")
// 	{
// 		character = AIInteraction.createFromPrompt(userPrompt);
// 	}
// 	// Otherwise, we already have the prompt and response.
// 	else
// 	{
// 		aiInteration = new AIInteraction(userPrompt, aiResponse);
// 	}

// 	// Insert our object.
// 	let db = req.app.get('db');
// 	character = await Database.insertData(db, character);
// 	res.send(JSON.stringify(character,null,4));
// });

// // Update Character
// characterRouter.put("/", async (req, res) => {
// 	let characterID = req.body.characterID;
// 	let userPrompt = req.body.userPrompt;
// 	let aiResponse = req.body.aiResponse;

// 	if(!isRequiredParameterPresent(res, characterID, "characterID"))
// 	{
// 		return;
// 	}

// 	if(!isRequiredParameterPresent(res, userPrompt, "userPrompt"))
// 	{
// 		return;
// 	}

// 	if(!isRequiredParameterPresent(res, aiResponse, "aiResponse"))
// 	{
// 		return;
// 	}

// 	let character = new AIInteraction(characterID, userPrompt, aiResponse);

// 	// Insert our object.
// 	let db = req.app.get('db');
// 	character = await Database.updateData(db, character);

// 	res.send(JSON.stringify(character,null,4));
// });


// characterRouter.delete("/:id", async (req, res) => {
// 	const id = req.params.id;
// 	if(!isRequiredParameterPresent(res, id, "id"))
// 	{
// 		return;
// 	}

// 	let character = AIInteraction.createDefault();
// 	character.setPrimaryKey(id);

// 	// Insert our object.
// 	let db = req.app.get('db');
// 	character = await Database.deleteData(db, character);

// 	sendSuccessMessage(res, `Successfully deleted AIInteraction with AIInteractionID: [${id}]` , null);
// });



export {characterRouter}
