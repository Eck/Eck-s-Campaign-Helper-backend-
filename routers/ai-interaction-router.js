import * as Database from "../database/initdatabase.js"
import express from "express";
import AIInteraction from "../models/ai-interaction.js"


let aiInteractionRouter = express.Router();


// GET request: Retrieve all ai interactions
aiInteractionRouter.get("/",async (req,res)=>
{
	let db = req.app.get('db');
	let aiInteraction = AIInteraction.createDefault();
	let aiInteractions = await Database.selectAllData(db, aiInteraction);
    res.send(JSON.stringify(aiInteractions,null,4));
});

// // GET by specific ID request: Retrieve a single friend with email ID
// aiInteractionRouter.get("/:id",(req,res)=>{
//     let email = req.params.email;

//     let selectedFriend = friends[email];
//     res.send(selectedFriend, null, 4);
// });


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
