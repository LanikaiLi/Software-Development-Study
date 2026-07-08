const express = require('express');
const books = require('./data');

const path = require('path'); // this is the path module, it is used to join the paths of the files
const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
    res.render('index.ejs', { books: books });
})

app.get('/api/books', (req, res) => {
    res.json(books);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

