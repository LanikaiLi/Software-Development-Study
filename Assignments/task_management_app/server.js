import 'dotenv/config'
import express from 'express'
import { MongoClient } from 'mongodb'

const app = express()
app.use(express.json())

let db

async function connectDB() {
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()
  db = client.db('task_management')
  console.log('Connected to MongoDB')
}

connectDB()

app.get('/', (req, res) => {
  res.send('Server is running')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

export const getDB = () => db