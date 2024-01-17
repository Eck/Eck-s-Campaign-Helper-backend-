import express from "express"
import * as Database from "./database/initdatabase.js"
import {aiInteractionRouter} from "./routers/ai-interaction-router.js"

const app = new express();


// Setup our database connection
let db = Database.openDatabase();
app.set('db', db); 

// map our routes
app.use("/interactions", aiInteractionRouter);

// Start listening to a port for our service
app.listen(3141, () => 
{
	console.log("Listening at http://localhost:3141")
});


// For now we're just going to forcibly close the database when it's time to quit.
// I need to research a better way to do cleanup. This article looked pretty good:
// https://stackoverflow.com/questions/43003870/how-do-i-shut-down-my-express-server-gracefully-when-its-process-is-killed
function cleanup()
{
	if(db != null)
	{
		db.close();
		db = null;
		app.set('db', null);
	}
}


process.on("SIGTERM", cleanup);
process.on("SIGINT", cleanup);
//db.close();
