const express = require('express');
const path = require('path');

const { MongoClient } = require('mongodb')
require('dotenv').config()
const uri = process.env.MONGODB_URI
const dbName = 'movie_rating'

let moviesCollection
let reviewsCollection

const initializeDatabase = async () => {
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db(dbName)
    moviesCollection = db.collection("movies")
    reviewsCollection = db.collection("reviews")
    console.log("Mongodb connected");
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const movies = [
//     { id: 1, title: 'Movie Title 1', thumbnail: '/placeholder.jpg', rating: 4, description: "Description for Movie Title 1" },
//     { id: 2, title: 'Movie Title 2', thumbnail: '/placeholder.jpg', rating: 5, description: "Description for Movie Title 2" },
//     { id: 3, title: 'Movie Title 3', thumbnail: '/placeholder.jpg', rating: 3, description: "Description for Movie Title 3" }
// ];

// const reviews = {
//     1: [
//         { reviewer: "John Doe", comment: "Great movie!", rating: 4 },
//         { reviewer: "Jane Smith", comment: "Enjoyed it a lot.", rating: 5 }
//     ],
//     2: [
//         { reviewer: "Alice Brown", comment: "Fantastic!", rating: 5 }
//     ],
//     3: []
// };

// routes 改成用 collection,而且要是 async
app.get('/', async (req, res) => {
    const movies = await moviesCollection.find().toArray();
    res.render('index', { movies: movies });
});

app.get('/movie/:id', async (req, res) => {
    const { ObjectId } = require('mongodb'); // 如果你用MongoDB自动生成的_id
    const movie = await moviesCollection.findOne({ _id: new ObjectId(req.params.id) });
    const movieReviews = await reviewsCollection.find({ movieId: req.params.id }).toArray();

    if (movie) {
        res.render('movie-detail', { movie: movie, reviews: movieReviews });
    } else {
        res.status(404).send('Movie not found');
    }
});

app.post('/submit-review', async (req, res) => {
    const { movieId, reviewer, rating, comment } = req.body;
    await reviewsCollection.insertOne({ movieId, reviewer, rating: parseInt(rating, 10), comment });
    res.redirect(`/movie/${movieId}`);
});

app.post('/submit-movie', async (req, res) => {
    const { title, thumbnail, rating, description } = req.body;
    await moviesCollection.insertOne({ title, thumbnail, rating: parseInt(rating, 10), description });
    res.redirect('/');
});

// 关键:先连数据库,连上了再启动服务器
const PORT = process.env.PORT || 3000;
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
});