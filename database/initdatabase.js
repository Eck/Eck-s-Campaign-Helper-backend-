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

// selects an array of dataObjects from the database. The dataObject passed in must implement the following interface:
//     getSelectAllStatement() - returns a sqlite select statement to pull the data
//     createFromRow(row) - creates an object of the appropriate time from a row of data.
async function selectAllData(db, dataObject)
{
	// db.all is technically not async. It just calls a callback when it's done. 
	// This means we can't await it, so I have to wrap it in a promise to be 
	// able to wait until its finished.
	const query = await new Promise((resolve, reject) =>
	{
		db.all(dataObject.getSelectAllStatement(), function(err, rows) 
		{
			genericdDatabaseCallback(err);
			if(err)
			{
				reject(err);
			}
			else
			{
				let createdObjects = [];
				rows.forEach(function (row) 
				{
					let createdObject = dataObject.createFromRow(row);
					createdObjects.push(createdObject);
				});
				resolve(createdObjects);
			}
		});
	});

	return query;
}

// selects a single dataObject by id. Returns null if it doesn't exist. 
//     getSelectAllStatement() - returns a sqlite select statement to pull the data
//     createFromRow(row) - creates an object of the appropriate time from a row of data.
async function selectSingleData(db, dataObject, id)
{
	// db.get is technically not async. It just calls a callback when it's done. 
	// This means we can't await it, so I have to wrap it in a promise to be 
	// able to wait until its finished.
	const query = await new Promise((resolve, reject) =>
	{
		db.get(dataObject.getSelectSingleStatement(), id, function(err, row) 
		{
			genericdDatabaseCallback(err);
			if(err)
			{
				reject(err);
			}
			else
			{
				let createdObject = null;
				if(row)
				{
					createdObject = dataObject.createFromRow(row);
				}
				resolve(createdObject);
			}
		});
	});

	return query;
}


// inserts a data object into the database. The dataObject passed in must implement the following interface:
//     getInsertStatement() - returns a sqlite insert statement
//     getInsertValues() - returns an array of it's insert values
//     setPrimaryKey() - takes a value to set the field that represents the primary key.
async function insertData(db, dataObject)
{
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
				reject(err);
			}
			else
			{
				dataObject.setPrimaryKey(this.lastID);
				resolve(dataObject);
			}
		});
	});

	return query;
}

export {openDatabase, initDatabase, selectAllData, selectSingleData, insertData}