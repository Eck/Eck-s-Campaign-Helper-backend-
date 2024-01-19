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


export {getRandomRace, getRandomClass, getRandomGender}