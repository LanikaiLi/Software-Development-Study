const express = require('express')

const app = express()
const port = process.env.PORT || 3001
const greetEmoji = "👋"

app.get('/', (req, res) => {
    res.send("Welcome to the solar system.")
})

app.get('/earth', (req, res) => {
    res.send(`earth is the 3rd planet from the sun`)
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})