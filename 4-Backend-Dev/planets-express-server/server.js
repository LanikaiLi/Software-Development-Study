const express = require('express')

const app = express()
const port = process.env.PORT || 3001
const greetEmoji = "👋"

app.get('/', (req, res) => {
    res.send("Welcome to the solar system.")
})

app.get('/earth', (req, res) => {
    res.json({
        name: 'Earth',
        description: 'The third planet from the sun',
        isHabitable: true
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})