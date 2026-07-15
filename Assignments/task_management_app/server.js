import 'dotenv/config'
import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'

const app = express()
app.use(express.json())

// MongoDB connection
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

 // api logics

 // 1. create a task
app.post('/tasks', async (req, res) => {
    const { title, description, priority, status, deadline } = req.body
  
    const task = {
      title,
      description,
      priority,
      status,
      deadline,
      created_at: new Date()
    }
  
    const result = await getDB().collection('tasks').insertOne(task)
  
    res.status(201).json({ message: 'Task created', task: { ...task, _id: result.insertedId } })
  })

// 2. update a task
app.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id
    const updates = req.body
  
    // find the task and update it
    const result = await getDB().collection('tasks').findOneAndUpdate(
      { _id: new ObjectId(id) },  // use objectid to change the type of the var from string to objectid, because mongodb uses objectid for the id, but postman sends the id as a string
      { $set: updates },           // set: only update the fields that are provided in the request body
      { returnDocument: 'after' } // return the updated document
    )
  
    if (!result) return res.status(404).json({ error: 'Task not found' })
  
    res.json({ message: 'Task updated', task: result })
  })