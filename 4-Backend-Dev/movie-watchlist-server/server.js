import express from 'express'
import movies from './movie.js'
// to work on this server, you need to have node.js installed, then run npm install express to install the express library, then run node server.js to start the server
// in the terminal, you can type 'node server.js' to start the server, then you can go to the browser and type 'http://localhost:3000' to see the welcome message
// to stop the server, you can press Ctrl + C in the terminal
// every time you make a change to the server.js file, you need to restart the server by typing 'node server.js' in the terminal by ctrl + c to stop the server and then run the command again

// const express = require('express') // imports the Express library into the file. `require()` is how Node.js loads installed packages from node_modules.

const app = express() // calls the express function to create a new application instance. This `app` object is what you use to define routes, set up middleware, and start the server.
app.use(express.json()) // this is to parse the incoming request body as JSON, if the request body is not JSON, it will be parsed as a string

// const movies = [
//     {title: 'Mario Galaxy', starring: ['Chris Pratt', 'Anya Taylor Joy']},
//     {title: 'The Drama', starring: ['Zendaya', 'Robert Pattinson']},
//     {title: 'Scream 7', starring: ['Neve Campbell', 'Jasmin Savoy Brown']},
//     {title: 'You Me & Tuscany', starring: ['Regé-Jean Page', 'Halle Bailey']},
//     {title: 'Nirvana the Band the Show the Movie', starring: ['Matt Johnson', 'Jay McCarrol']},
//     {title: 'Hamnet', starring: ['Jessie Buckley', 'Paul Mescal']}
//   ]

  app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the movie watchlist server." // for now req is not important, it will be used when the user send a POST request to the server, but now it is just a GET request to the server
    })
})

app.get("/movies", (req, res) => {
    res.json(movies)
})

// exercise: try to build a route which returns all movies watched
// Must be registered before /movies/:name, otherwise "watched" is treated as a movie title.
app.get("/movies/watched", (req, res) => {
    const watched = movies.filter(movie => movie.watched)
    res.json(watched)
})

app.get("/movies/:name", (req, res) => {
    console.log(req.params.name)
    const selectedMovie = movies.find(movie => movie.title === req.params.name)
    res.json(selectedMovie) 
})

// app.get("/movies/watched", (req, res) => {
//     const watched = movies.filter(movie => movie.watched)
//     res.json(watched)
// })

// exercise: try to build a route to find all movies starring a specific actor
app.get("/movies/starring/:actor", (req, res) => {
    console.log(req.params.actor)
    const selectedMovies = movies.filter(movie => movie.starring.includes(req.params.actor))
    res.json(selectedMovies)
})

// POST request below

let counter  =  20

app.post("/movies", (req, res) => {
    console.log(req.body)

    const newMovie = {
        title: req.body.title,
        starring: req.body.starring,
        year: req.body.year,
        watched: req.body.watched,
        id: movies.length + 1,
        counter: counter++
    }

    movies.push(newMovie)
    res.status(201).json(newMovie)
})

// DELETE request below
app.delete("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const index = movies.findIndex(movie => movie.id === id)

    if (index === -1) {
        return res.status(404).json({error: `No movie with id ${id}.`})
    }

    const deletedMovie = movies.splice(index, 1)
    res.json({message: "Deleted:", movie: deletedMovie})
})

// PATCH request below
//PATCH and PUT are used to update the data in the server, the difference is that PATCH is used to update a part of the data, while PUT is used to update the entire data.
app.patch("/movies/:id/toggle-watched", (req, res) => {
    const id = parseInt(req.params.id)
    const movie = movies.find(movie => movie.id === id)
    movie.watched = !movie.watched
    res.json({message: "Toggled watched status of:", movie: movie})
})

const port = 3000 // this is the port number that the server will listen on
app.listen(port, () => { // remember, app.listen has to be put after all the routes are defined, if you put it before routes (app.get("/movies", (req, res) => { ... })), the server will not start
    console.log(`Server is running on port ${port}`)
})


