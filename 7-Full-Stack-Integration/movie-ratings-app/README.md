# Movie Ratings & Reviews App

This is a simple movie ratings and reviews app built with HTML, CSS, and Node.js.

## File Structure

```
project-root/
│
├── views/
│   ├── index.ejs
│   ├── movie-detail.ejs
│   └── submit-review.ejs
├── public/
│   ├── styles.css
│   └── placeholder.jpg
├── node_modules/
├── app.js
├── package.json
└── package-lock.json
```

## How to Run the App

1. **Clone the repository:**
   ```sh
   git clone git@github.com:Circuit-Stream-LMS/movie-ratings-app.git
   cd project-root
   ```

2. **Install the dependencies:**
   ```sh
   npm install
   ```

3. **Run the application:**
   ```sh
   node app.js
   ```

4. **Open your web browser and go to:**
   ```
   http://localhost:3000
   ```

## Next Steps: Fetch Movies from a Database

Currently, the movies are hard-coded in the `app.js` file as shown below:

```javascript
const movies = [
    { id: 1, title: 'Movie Title 1', thumbnail: '/placeholder.jpg', rating: 4, description: "Description for Movie Title 1" },
    { id: 2, title: 'Movie Title 2', thumbnail: '/placeholder.jpg', rating: 5, description: "Description for Movie Title 2" },
    { id: 3, title: 'Movie Title 3', thumbnail: '/placeholder.jpg', rating: 3, description: "Description for Movie Title 3" }
];
```

Let's make some changes to persist these movies in MongoDB!
