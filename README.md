# Eck-s-Campaign-Helper-backend
I needed a real project to better help my learning efforts for some cloud computing technologies. It'll also serve as an example for potential employers. My plan is to make some AI assisted tools that will be useful for DM's and learn some cloud computing stuff along the way. It's still very early days, but I'm making good progress.

I started this project in early January 2024, but it isn't the only thing I'm working on. Monday and Friday, I'm dedicated to coding on this project. But Tuesday and Thursday, I'm focused on working towards my IBM Full Stack Cert which is made up of 12 other certs. I'm burning through a couple weeks of classes each day. Take a look at my progress here: [Certificates](https://ecktechgames.com/certifications/). And Wednesday is a wild card day. It might be programming, it might be learning, or it might be RPG prep for a Rogue Trader game that I'm running for my daughter.

This project is going to be a RESTful api written in node.js/express to serve up CRUD requests and interact with ChatGPT and MidJourney. I'm also learning python/flask so I'll probably use that to create a webserver that uses this backend to do all the heavy lifting. 

## Overall Goal:
* Make a helper app to generate random NPC's for an RPG campaign like Dungeons & Dragons.
* Ask ChatGPT to write a cool description for those NPC's.
* Ask MidJourney to make some character art for those NPC's.
* Store all that stuff in in the database so people can browse it.

## Recent Progress:
Here's a brief summary of what I have working so far. Take a look at the git history for more details. See also: [Notes.txt](https://github.com/Eck/EcksCampaignHelper-Backend/blob/main/Notes.txt) - for more details on current tasks and planned next steps.
* Getting CRUD routes setup for AIInteraction (Select all, select single, insert, and update. Still working on delete)
* Setup generic database operations to do (Select all, select single, insert, and update. Still working on delete)
* Pulled OpenAI scratch code into its own file so index can start acting like a real index.js.



