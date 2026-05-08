require("dotenv").config()
const { MongoClient } = require("mongodb")
const seedData = require("./seed-data")

async function addSeedData () {
    const uri = process.env.MONGODB_URI
    if (!uri) {
        throw new Error("Missing MONGODB_URI in .env (same variable as server.js)")
    }
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db("megaphone")
    const result = await db.collection("posts").insertMany(seedData)
    console.log(`Inserted ${result.insertedCount} posts.`)
    await client.close()
}

addSeedData()