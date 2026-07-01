// ------------------------------------------------------------
// set up the server
// ------------------------------------------------------------

// require the necessary libraries
require('dotenv').config()
const path = require('path')
const express = require('express');
const app = express();
app.use(express.json())

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
    res.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    return res.sendStatus(204)
  }

  next()
})

app.use(express.static(path.join(__dirname, '../public')))

// import the routes
const authRoutes = require ('./routes/auth') // . means the same directory, which is src
const noteRoutes = require ('./routes/note')

// use the routes
app.use('/auth', authRoutes)
app.use('/note', noteRoutes)


app.listen(3001, () => { //app.listen is a method that listens for incoming requests on the specified port, it is required for all express servers. it has to be put after all the routes are defined, if you put it before routes (app.get("/movies", (req, res) => { ... })), the server will not start
  console.log('Server is running on port 3001');
});

