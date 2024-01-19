import * as Database from "../database/initdatabase.js"
import {EMPTY_GENDER, genderSelectAllStatement, genderSelectAllNonRandomStatement} from "../models/gender.js";
import {EMPTY_RACE, raceSelectAllStatement, raceSelectAllNonRandomStatement} from "../models/race.js";
import {EMPTY_CLASS, classSelectAllStatement, classSelectAllNonRandomStatement} from "../models/class.js";
import {Character, EMPTY_CHARACTER} from "../models/character.js";


let cacheAllGenders = null;
let cacheAllRaces = null;
let cacheAllClasses = null;

async function getAllGenders(db)
{
	if(cacheAllGenders === null)
	{
		cacheAllGenders = await Database.executeSelectStatement(db, EMPTY_GENDER, genderSelectAllStatement); 
	}
	return cacheAllGenders;
}

async function getAllRaces(db)
{
	if(cacheAllRaces === null)
	{
		cacheAllRaces = await Database.executeSelectStatement(db, EMPTY_RACE, raceSelectAllStatement); 
	}
	return cacheAllRaces;
}

async function getAllClasses(db)
{
	if(cacheAllClasses === null)
	{
		cacheAllClasses = await Database.executeSelectStatement(db, EMPTY_CLASS, classSelectAllStatement); 
	}
	return cacheAllClasses;
}

function getRandomItemFromArray(items)
{
	let randomIndex = Math.floor(Math.random()*items.length); 
	var item = items[randomIndex];
	return item;
}

async function getRandomWrapper(db, emptyObject, statement)
{
	let items = await Database.executeSelectStatement(db, emptyObject, statement);
	let selectedItem = getRandomItemFromArray(items);
	return selectedItem;
}

async function getRandomRace(db)
{
	let selectedItem = await getRandomWrapper(db, EMPTY_RACE, raceSelectAllNonRandomStatement);
	return selectedItem;
}

async function getRandomClass(db)
{
	let selectedItem = await getRandomWrapper(db, EMPTY_CLASS, classSelectAllNonRandomStatement);
	return selectedItem;
}

async function getRandomGender(db)
{
	let selectedItem = await getRandomWrapper(db, EMPTY_GENDER, genderSelectAllNonRandomStatement);
	return selectedItem;
}

// Given a character, fills in all the random details and generates a prompt 
// to send to ChatGPT
async function fillInRandomCharacterDetails(db, character)
{
	let rolledCharacter = Character.createFromCharacter(character);

	let item = null;

	if(!character.RaceID || character.RaceID == 0)
	{
		item = await getRandomRace(db);
		rolledCharacter.RaceID = item.RaceID;
	}

	if(!character.ClassID || character.ClassID == 0)
	{
		item = await getRandomClass(db);
		rolledCharacter.ClassID = item.ClassID;
	}

	if(!character.GenderID || character.GenderID == 0)
	{
		item = await getRandomGender(db);
		rolledCharacter.GenderID = item.GenderID;
	}

	rolledCharacter.generatedDescriptionPrompt = genearteDescriptionPrompt(db, rolledCharacter)

	return rolledCharacter;
}

// Given a character, generates a prompt to send to ChatGPT
async function genearteDescriptionPrompt(db, character)
{
	let genders = await getAllGenders(db);
	let gender = genders.find(obj => { return obj.GenderID === character.GenderID});

	let races = await getAllRaces(db);
	let race = races.find(obj => { return obj.RaceID === character.RaceID});

	let charClasses = await getAllClasses(db);
	let charClass = charClasses.find(obj => { return obj.ClassID === character.ClassID});

	let generatedDescriptionPrompt = `Write a short character description for a ${gender.GenderName} ${race.RaceName} ${charClass.ClassName}. ${character.OtherNotes}`;

	return generatedDescriptionPrompt;
}

export {getRandomRace, getRandomClass, getRandomGender, fillInRandomCharacterDetails, genearteDescriptionPrompt}