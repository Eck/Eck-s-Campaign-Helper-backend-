import {config} from "dotenv";
import sqlite3 from "sqlite3";
import fs from "fs";

sqlite3.verbose();
config();
const databaseFilename = process.env.DATABASE_Filename;

// Simple callbacks for the commands. I wanted to try real functions instead of
//  inlined arrow functions to see how I liked it.
function openDatabaseCallback(err)
{
	if (err) 
		console.error(err.message);
	else
		console.log(`Connected to the database at [${databaseFilename}].`);
}

function genericdDatabaseCallback(err)
{
	if (err) 
		console.error(err.message);
	else
		console.log(`Successfully ran command on the database at [${databaseFilename}].`);
}

function closeDatabaseCallback(err)
{
	if (err) 
		console.error(err.message);
	else
		console.log(`Closed the database at [${databaseFilename}].`);
}

// Loads the file and executes it against the passed in database
function execScript(db, sqlFilename)
{
	const tableSchemaText = fs.readFileSync(sqlFilename, {encoding: "utf-8"});
	console.log(`Executing sql script[${sqlFilename}]`)
	db.exec(tableSchemaText, genericdDatabaseCallback);
}


// open the database
let db = new sqlite3.Database(databaseFilename, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, openDatabaseCallback);

// Run some commands one after the other.
db.serialize(() => 
{
	db.run("BEGIN TRANSACTION;", genericdDatabaseCallback);
	execScript(db, "./database/01-seed-tables.sql");
	db.run("COMMIT;", genericdDatabaseCallback);
});

// close the database
db.close(closeDatabaseCallback);