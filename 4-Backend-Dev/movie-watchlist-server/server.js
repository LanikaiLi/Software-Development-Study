// to work on this server, you need to have node.js installed, then run npm install express to install the express library, then run node server.js to start the server
// in the terminal, you can type 'node server.js' to start the server, then you can go to the browser and type 'http://localhost:3000' to see the welcome message
// to stop the server, you can press Ctrl + C in the terminal
// every time you make a change to the server.js file, you need to restart the server by typing 'node server.js' in the terminal by ctrl + c to stop the server and then run the command again

const express = require('express') // imports the Express library into the file. `require()` is how Node.js loads installed packages from node_modules.

const app = express() // calls the express function to create a new application instance. This `app` object is what you use to define routes, set up middleware, and start the server.

const movies = [
    {title: 'Mario Galaxy', starring: ['Chris Pratt', 'Anya Taylor Joy']},
    {title: 'The Drama', starring: ['Zendaya', 'Robert Pattinson']},
    {title: 'Scream 7', starring: ['Neve Campbell', 'Jasmin Savoy Brown']},
    {title: 'You Me & Tuscany', starring: ['Regé-Jean Page', 'Halle Bailey']},
    {title: 'Nirvana the Band the Show the Movie', starring: ['Matt Johnson', 'Jay McCarrol']},
    {title: 'Hamnet', starring: ['Jessie Buckley', 'Paul Mescal']}
  ]

  app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the movie watchlist server." // for now req is not important, it will be used when the user send a POST request to the server, but now it is just a GET request to the server
    })
})

app.get("/movies", (req, res) => {
    res.json(movies)
})

app.get("/movies/:name", (req, res) => {
    console.log(req.params.name)
    const selectedMovie = movies.find(movie => movie.title === req.params.name)
    res.json(selectedMovie) 
})

// exercise: try to build a route to find all movies starring a specific actor


const port = 3000 // this is the port number that the server will listen on
app.listen(port, () => { // remember, app.listen has to be put after all the routes are defined, if you put it before routes (app.get("/movies", (req, res) => { ... })), the server will not start
    console.log(`Server is running on port ${port}`)
})


