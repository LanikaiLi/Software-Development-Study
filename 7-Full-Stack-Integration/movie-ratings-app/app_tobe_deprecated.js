const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const movies = [
    { id: 1, title: 'Movie Title 1', thumbnail: '/placeholder.jpg', rating: 4, description: "Description for Movie Title 1" },
    { id: 2, title: 'Movie Title 2', thumbnail: '/placeholder.jpg', rating: 5, description: "Description for Movie Title 2" },
    { id: 3, title: 'Movie Title 3', thumbnail: '/placeholder.jpg', rating: 3, description: "Description for Movie Title 3" }
];

const reviews = {
    1: [
        { reviewer: "John Doe", comment: "Great movie!", rating: 4 },
        { reviewer: "Jane Smith", comment: "Enjoyed it a lot.", rating: 5 }
    ],
    2: [
        { reviewer: "Alice Brown", comment: "Fantastic!", rating: 5 }
    ],
    3: []
};

app.get('/', (req, res) => {
    res.render('index', { movies: movies });
});

app.get('/movie/:id', (req, res) => {
    const movieId = parseInt(req.params.id, 10);
    const movie = movies.find(m => m.id === movieId);
    const movieReviews = reviews[movieId] || [];

    if (movie) {
        res.render('movie-detail', { movie: movie, reviews: movieReviews });
    } else {
        res.status(404).send('Movie not found');
    }
});

app.get('/submit-review', (req, res) => {
    res.render('submit-review');
});

app.post('/submit-review', (req, res) => {
    const { movieId, reviewer, rating, comment } = req.body;
    const newReview = { reviewer, rating: parseInt(rating, 10), comment };

    if (!reviews[movieId]) {
        reviews[movieId] = [];
    }

    reviews[movieId].push(newReview);
    res.redirect(`/movie/${movieId}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});