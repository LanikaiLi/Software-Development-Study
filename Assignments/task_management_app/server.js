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

function getMonday(date) {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    d.setDate(diff)
    return d
  }
  
  function getDateRange(range) {
    const now = new Date()
    const monday = getMonday(now)
    if (range === 'last_week') monday.setDate(monday.getDate() - 7)
    if (range === 'next_week') monday.setDate(monday.getDate() + 7)
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    return {
      startDate: monday.toISOString().split('T')[0],
      endDate: sunday.toISOString().split('T')[0]
    }
  }

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

// 3. delete a task
app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id
    const result = await getDB().collection('tasks').deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Task not found' })
    res.json({ message: 'Task deleted', task: result })
})

// 4. get all tasks with filter
app.get('/tasks', async (req, res) => {
    const { range } = req.query
    let filter = {}
    if (range !== 'all') {
      const { startDate, endDate } = getDateRange(range || 'this_week')
      filter.deadline = { $gte: startDate, $lte: endDate }
    }
    const tasks = await db.collection('tasks').find(filter).toArray()
    res.json({ tasks })
  })

// 5. get a task by id
app.get('/tasks/:id', async (req, res) => {
    const id = req.params.id
    const task = await getDB().collection('tasks').findOne({ _id: new ObjectId(id) })
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.json({ task })
})