import express from "express"
import * as Database from "./database/initdatabase.js"
import MockOpenAI from './controllers/mockopenai.js'
import {aiInteractionRouter} from "./routers/ai-interaction-router.js"
import {characterRouter} from "./routers/character-router.js"


const app = new express();

// Setup our database connection
let db = Database.openDatabase();
app.set('db', db); 

// Setup our openAI 
let openAIParams = {};
openAIParams.apiKey = process.env.OPENAI_API_KEY;
// TODO - look up a dependency injection framework later. I just wanted to get some coolness going so we're hardcoding directly to the mock class.
//const openAI = new OpenAI(openAIParams);
let openAI = new MockOpenAI(openAIParams);
app.set('openAI', openAI)

// Tell express to parse json into objects
app.use(express.json());

// map our routes
app.use("/interactions", aiInteractionRouter);
app.use("/characters", characterRouter);

// Start listening to a port for our service
let server = app.listen(3141, () => 
{
	console.log("Listening at http://localhost:3141")
});


// For now we're just going to forcibly close the database when it's time to quit.
// I need to research a better way to do cleanup. This article looked pretty good:
// https://stackoverflow.com/questions/43003870/how-do-i-shut-down-my-express-server-gracefully-when-its-process-is-killed
function cleanup()
{
	// If the db hasn't been closed yet, close it
	if(db != null)
	{
		db.close();
		db = null;
		app.set('db', null);
	}

	// If the server hasn't been closed yet, close it.
	if(server != null)
	{
		console.log("Server shutting down...")
		server.close();
		server = null;
	}
}


process.on("SIGTERM", cleanup);
process.on("SIGINT", cleanup);
//db.close();

// A way to forcibly close the process
// netstat -ano | findstr :3141
//  taskkill //pid 41736 //f
