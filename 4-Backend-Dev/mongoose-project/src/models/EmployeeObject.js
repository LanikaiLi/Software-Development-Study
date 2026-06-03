const mongoose = require('mongoose');

// this is a schema for the employee object
/*
my idea is:
first name, last name, availability (mon, tue, fri), certifications, email, phone(optional), dateJoined
*/

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    availability: {
        type: [String], // [] means it is an array, and array of strings
        required: true
    },
    certifications: {
        type: [String],
        default: [] // by setting a default, we mean certifications is not required. we don't necessarily need to say 'required: false'
    },
    email: {
        type: String,
        required: true,
        unique: true // two employees cannot have the same email
    },
    phone: String, // without required:true, we mean phone is not a required field
    dateJoined: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Employee', employeeSchema); // this is to export the model so we can use it in other files