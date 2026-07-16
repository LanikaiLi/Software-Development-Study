const express = require('express')
const books = require('./data')
const { MongoClient } = require('mongodb')

require('dotenv').config()

const path = require('path')
const PORT = process.env.PORT
const app = express()

const uri = process.env.MONGODB_URI
const dbName = 'book-inventory'
const shouldSeed = process.argv.includes('--seed')

app.use(express.json())

let booksCollection

const initializeDatabase = async () => {
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db(dbName)
    booksCollection = db.collection("books")
}

// 静态文件服务（static file serving）：把本地 public 目录映射到网站根路径。
// 浏览器请求 /books.png 时，Express 会直接读 public/books.png 返回，不用再写路由。
// 适合放图片、CSS、JS 等不会变的前端资源；index.ejs 里的 favicon 就是靠这个发出去的。
//
// 为什么需要：这个 app 是「前后端一体」——Express 既渲染页面（EJS），又提供 API，
// 所以静态资源也得由它来发。如果前端单独放到 GitHub Pages / Netlify，
// 图片等由那边托管，Express 只管 API，通常就不用这行了。
// 注意：本项目用 EJS 服务端渲染，不能直接搬到 GitHub Pages；要拆前端得先改成纯客户端页面再 fetch API。
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
    const response = await fetch(`http://localhost:${PORT}/api/books`)
    let books = await response.json()
    tag = req.query.tag
    if (tag) {
        books = books.filter(book => book.tags.includes(tag))
    }
    res.render('index.ejs', {books: books})
    // console.log(req.query)
})

app.get('/api/books', async (req, res) => {
    const books = await booksCollection.find().toArray()
    res.json(books)
})

app.post('/api/books', async (req, res) => {
    const inserted = await booksCollection.insertOne(req.body)
    res.status(201).json(inserted)
})

const seedDatabaseThroughApi = async () => {
    await booksCollection.deleteMany({})

    for (const book of books) {
        const response = await fetch(`http://localhost:${PORT}/api/books`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        })

        if (!response.ok) {
            const text = await response.text()
            throw new Error(`Seed failed for "${book.title}": ${response.status} ${text}`)
        }
    }

    console.log(`Seed complete: ${books.length} books inserted`)
}

initializeDatabase().then(() => {
    const server = app.listen(PORT, async () => {
        console.log(`Server listening on port ${PORT}.`)

        if (!shouldSeed) return

        try {
            await seedDatabaseThroughApi()
            console.log('Manual seed finished')
        } catch (error) {
            console.error(error.message)
            process.exitCode = 1
        } finally {
            server.close(() => process.exit(process.exitCode || 0))
        }
    })
}).catch((error) => {
    console.error('Database initialization failed:', error.message)
    process.exit(1)
})