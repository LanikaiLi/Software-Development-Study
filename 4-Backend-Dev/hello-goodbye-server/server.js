const express = require('express')

const app = express()
const port = process.env.PORT || 3000
const greetEmoji = "👋"

app.get('/', (req, res) => {
    res.send("Welcome to the hello/goodbye server.")
})

app.get('/hello', (req, res) => {
    res.send(`hello ${greetEmoji}`)
})

app.get('/hello/:name', (req, res) => {
    res.send(`hello ${req.params.name} ${greetEmoji}`)
})

app.get('/goodbye', (req, res) => {
    res.send(`goodbye ${greetEmoji}`)
})

app.get('/goodbye/:name', (req, res) => {
    res.send(`goodbye ${req.params.name} ${greetEmoji}`)
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})