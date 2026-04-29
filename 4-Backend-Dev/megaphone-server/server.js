require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
const express = require('express');
const app = express();
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // 让外层知道连库失败，不要继续 app.listen
  }
}

// connectToMongoDB().catch(console.dir);

async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // 启动失败时结束进程，避免误以为服务已就绪
  }
}

startServer().catch(console.dir);


// CONTINUING WITH OUR MICROBLOG PROJECT:

// Tomorrow we will do an exhaustive review of this example project, so I’d like you all to take some time today to try to advance it on your own. The stack for this project (“stack” means the combination of frameworks and languages used to run the application, both frontend and backend) is MongoDB, Express, and Node. We’re using Express for the server, MongoDB for the database, and Node to connect them together. For the frontend, we can use plain Javascript/HTML/CSS.

// The goal is to create an application where you can do the following things in the database:
// 1. Add a new “post” to the database (a post has a body, an author, and a time it was created).
// 2. Read all posts from the database.
// 3. Delete a post from the database.
// 4. (And optionally, edit a post)

// In the backend, you can do all of these with Postman. Once you have them working in Postman, you can try to get started on building a working frontend.

// For building out the post and read routes, refer to this Github repo, which we covered together yesterday: https://github.com/j-goodman/megaphone-2-server/blob/main/server.js

// Remember that that server imports a variable called MONGO_URI from .env. So your .env should look something like this:

// `MONGO_URI=mongodb+srv://jgoodman_db_user:<password>@atlas-cluster-1.wfeql9r.mongodb.net/?appName=atlas-cluster-1`

// To build out the delete route, refer to our Movie Watchlist Server here: https://github.com/j-goodman/movie-watchlist-server

// To get started on the frontend, refer to this repo here: https://github.com/j-goodman/movie-watchlist-frontend

// The frontend can look almost exactly like that one -- it doesn’t need to know about MongoDB or anything, it just needs to be able to make fetch requests. But remember you’re only going to be able to make a fetch request while your server is running.

// I’d like to give you guys some independant space here to try experimenting with MongoDB, Express, and Node, so feel free to try other things you’re curious about! Feel free as well to reach out to each other to collaborate and help out with issues you might run into. We’re going to be using this stack for a while, so don’t feel bad if it’s still intimidating to get into it. You can reach out to me on Discord with issues, and if you think of any larger discussion questions we’ll have plenty of time to get into those during tomorrow’s session. Don't feel pressure to get something finished or working perfectly tonight, this can be a chance to experiment and see what works and what doesn't.
