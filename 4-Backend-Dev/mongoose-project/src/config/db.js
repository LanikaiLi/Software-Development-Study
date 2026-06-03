const mongoose = require('mongoose');


// this is a file to store helper functions that are used to connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB; // export the function so we can use it in other files