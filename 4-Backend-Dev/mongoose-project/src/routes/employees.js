const express = require('express');
const Employee = require('../models/EmployeeObject');

const router = express.Router();

router.post('/', async (req, res) => {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
})

module.exports = router; // this is to export the router so we can use it in other files