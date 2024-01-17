import * as Database from "../database/initdatabase.js"
import express from "express";
import {AIInteraction, EMPTY_AI_INTERACTION} from "../models/ai-interaction.js"


let aiInteractionRouter = express.Router();


// GET request: Retrieve all ai interactions
aiInteractionRouter.get("/",async (req,res)=>
{
	let db = req.app.get('db');
	let aiInteractions = await Database.selectAllData(db, EMPTY_AI_INTERACTION);
	res.send(JSON.stringify(aiInteractions,null,4));
});

// GET by specific ID request: Retrieve a single friend with email ID
aiInteractionRouter.get("/:id",async (req,res)=>
{
    let id = req.params.id;
	let db = req.app.get('db');
	let aiInteraction = await Database.selectSingleData(db, EMPTY_AI_INTERACTION, id);
	res.send(JSON.stringify(aiInteraction,null,4));
});


// router.post("/",function (req,res){
//     if (req.body.email){
//         friends[req.body.email] = {
//             "firstName":req.body.firstName,
//             "lastName":req.body.lastName,
//             "dob":req.body.DOB,
//             }
//     }
// res.send("The user" + (' ')+ (req.body.firstName) + " Has been added!");
// });


// // PUT request: Update the details of a friend with email id
// router.put("/:email", function (req, res) {
//     const email = req.params.email;
//     let friend = friends[email]
//     if (friend) { //Check is friend exists
//         let DOB = req.body.DOB;
//         //Add similarly for firstName
//         //Add similarly for lastName
//         //if DOB the DOB has been changed, update the DOB 
//         if(DOB) {
//             friend["DOB"] = DOB
//         }
//         //Add similarly for firstName
//         //Add similarly for lastName
//         friends[email]=friend;
//         res.send(`Friend with the email  ${email} updated.`);
//     }
//     else{
//         res.send("Unable to find friend!");
//     }
//   });


// // DELETE request: Delete a friend by email id
// router.delete("/:email", (req, res) => {
//     const email = req.params.email;
//     if (email){
//         delete friends[email]
//     }
//     res.send(`Friend with the email  ${email} deleted.`);
//   });

export {aiInteractionRouter}
