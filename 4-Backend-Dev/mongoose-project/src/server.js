require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');

connectDB();

app.use(express.json()); // this is to parse the incoming request body as JSON, if the request body is not JSON, it will be parsed as a string

app.get("/", (req, res) => {
    res.json({message: "Employee Management System"});
});

//app.use('/employees', employeeRoutes); // for any route that starts with /employees, use the employeeRoutes middleware

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});