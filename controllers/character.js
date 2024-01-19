import * as Database from "../database/initdatabase.js"
import {EMPTY_RACE, raceSelectAllNonRandomStatement} from "../models/race.js";


function getRandomItemFromArray(items)
{
	let randomIndex = Math.floor(Math.random()*items.length); 
	var item = items[randomIndex];
	return item;
}

async function getRandomRace(db)
{
	let raceList = await Database.executeSelectStatement(db, EMPTY_RACE, raceSelectAllNonRandomStatement);
	let selectedRace = getRandomItemFromArray(raceList);
	return selectedRace;
}

export {getRandomRace}