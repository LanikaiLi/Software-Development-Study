//setup express and mongodb
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI;
const express = require('express');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
const pbkdf2 = promisify(crypto.pbkdf2);
const app = express();
app.use(express.json());

app.use((req, res, next) => { // this is to allow the server to accept requests from other domains, so that the client can send a request to the server from another domain
  res.set(`Access-Control-Allow-Origin`, `*`)

  if (req.method === `OPTIONS`) {
      res.set(`Access-Control-Allow-Methods`, `POST,PATCH,DELETE`)
      res.set(`Access-Control-Allow-Headers`, `Content-Type`)
      return res.sendStatus(204)
  }

  next()
})

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

// global variables
const db = client.db("megaphone");
const postsCollection = db.collection("posts");
const port = process.env.PORT || 3000;
const frontendDir = path.join(__dirname, "../magaphone-frontend/connect-frontend-to-server-and-db");

// create a new post (inline async + try/catch is the usual style for simple routes)
app.post("/posts", async (req, res) => {
  try {
    const { body, author } = req.body;
    if (body == null || author == null) {
      return res.status(400).json({ error: "body and author are required" });
    }
    const newPost = {
      body,
      author,
      createdAt: new Date(),
    };
    const result = await postsCollection.insertOne(newPost);
    res.status(201).json({ ...newPost, _id: result.insertedId });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// read all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await postsCollection.find().toArray();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// delete a post
app.delete("/posts/:id", async (req, res) => {
  await db.collection("posts").deleteOne({
      _id: new ObjectId(req.params.id)
  })
  res.end();
});
// connectToMongoDB().catch(console.dir);

app.get("/newuser", (req, res) => {
  res.sendFile("newuser.html", { root: frontendDir });
});

// Serve CSS/JS (browser requests /style.css, /create-user.js from /newuser page)
app.use(express.static(frontendDir));

app.post("/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    const salt = crypto.randomBytes(16);
    const hashedPassword = await pbkdf2(password, salt, 310000, 32, "sha256");

    const insertResult = await db.collection("users").insertOne({
      username,
      hashed_password: hashedPassword.toString("base64"),
      salt: salt.toString("base64"),
    });

    return res.status(201).json({
      _id: insertResult.insertedId,
      username,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Failed to create user." });
  }
});

async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // 启动失败时结束进程，避免误以为服务已就绪
  }
}

startServer().catch(console.dir);

