const express = require('express');
const Employee = require('../models/EmployeeObject');

const router = express.Router();

router.post('/', async (req, res) => {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
})

router.get('/', async (req, res) => {
	const employees = await Employee.find()
	res.json(employees)
})

router.get('/:id', async (req, res) => {
	const employee = await Employee.findById(req.params.id)
	if (!employee) return res.status(404).json({message: 'Employee not found'})
	res.json(employee)
})

router.delete('/:id', async (req, res) => {
	const employee = await Employee.findByIdAndDelete(req.params.id)
	if (!employee) return res.status(404).json({message: 'Employee not found'})
	res.json({ message: 'Employee deleted successfully' })
})

module.exports = router; // this is to export the router so we can use it in other files