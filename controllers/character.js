import * as Database from "../database/initdatabase.js"
import {EMPTY_RACE, raceSelectAllNonRandomStatement} from "../models/race.js";
import {EMPTY_CLASS, classSelectAllNonRandomStatement} from "../models/class.js";
import {EMPTY_GENDER, genderSelectAllNonRandomStatement} from "../models/gender.js";


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

async function fillInRandomCharacterDetails(db, character)
{
	if(!character.RaceID || character.RaceID == 0)
	{
		let race = await getRandomRace(db);
		character.RaceID = race.RaceID;
	}

	if(!character.ClassID || character.ClassID == 0)
	{
		let charClass = await getRandomClass(db);
		character.ClassID = charClass.ClassID;
	}

	if(!character.GenderID || character.GenderID == 0)
	{
		let gender = await getRandomGender(db);
		character.GenderID = gender.GenderID;
	}

	return character;
}

export {getRandomRace, getRandomClass, getRandomGender, fillInRandomCharacterDetails}