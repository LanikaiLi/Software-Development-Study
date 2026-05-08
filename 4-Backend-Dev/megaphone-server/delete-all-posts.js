require("dotenv").config()
const { MongoClient } = require("mongodb")

async function deleteAllPosts () {
    const uri = process.env.MONGODB_URI
    if (!uri) {
        throw new Error("Missing MONGODB_URI in .env (same variable as server.js)")
    }
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db("megaphone")
    const result = await db.collection("posts").deleteMany({})
    console.log(`Deleted ${result.deletedCount} posts.`)
    await client.close()
}

deleteAllPosts()