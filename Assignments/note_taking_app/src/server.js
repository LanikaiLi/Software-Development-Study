// ------------------------------------------------------------
// set up the server
// ------------------------------------------------------------

// require the necessary libraries
require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.json())

app.get('/', (req, res) => {
  res.send('服务器运行成功！');
});

// import the routes
const authRoutes = require ('./routes/auth') // . means the same directory, which is src
const noteRoutes = require ('./routes/note')

// use the routes
app.use('/auth', authRoutes)
app.use('/note', noteRoutes)


app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

