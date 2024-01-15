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

// Opens the database at {databaseFilename} and returns it
function openDatabase()
{
	let db = new sqlite3.Database(databaseFilename, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, openDatabaseCallback);
	return db;
}

// Builds the starting database from a series of scripts located in ./database/*.sql
function initDatabase()
{
	// open the database
	let db = openDatabase();

	// Run all the scripts wrapped in a transaction.
	db.serialize(() => 
	{
		db.run("BEGIN TRANSACTION;", genericdDatabaseCallback);
		execScript(db, "./database/01-seed-tables.sql");
		db.run("COMMIT;", genericdDatabaseCallback);
	});

	// close the database
	db.close(closeDatabaseCallback);
}

// inserts a data object into the database. The dataObject passed in must implement the following interface:
//     getInsertStatement() - returns a sqlite insert statement
//     getInsertValues() - returns an array of it's insert values
//     setPrimaryKey() - takes a value to set the field that represents the primary key.
async function insertData(dataObject)
{
	let db = openDatabase();

	// db.run is technically not async. It just calls a callback when it's done. 
	// This means we can't await it, so I have to wrap it in a promise to get at the 
	// primary key that was created during the insert.
	const query = await new Promise((resolve, reject) =>
	{
		// Run our insert statement
		db.run(dataObject.getInsertStatement(), dataObject.getInsertValues(), function (err) // Can't be an arrow func. Must be a defined function to access this.lastID
		{
			genericdDatabaseCallback(err);
			if(err)
			{
				reject(err)
			}
			else
			{
				dataObject.setPrimaryKey(this.lastID);
				resolve(dataObject);
			}
		});
		db.close();
	});

	return query;
}


export {initDatabase, insertData}