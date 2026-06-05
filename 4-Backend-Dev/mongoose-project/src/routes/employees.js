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

//more Mongoose queries:

// ---- SORTING ----
// 1. sort employees by dateJoined in descending order
router.get('/sorted/date-joined', async(req, res) => {
	const employees = await Employee.find().sort({dateJoined: -1}) // -1 is descending order, 1 is ascending order, .sort() is a Mongoose method which is like ORDER BY in SQL, you need to provide the column you want to sort by, and the order you want to sort by, in this case, we want to sort by dateJoined in descending order
	res.json(employees)
})

//2. sort employees alphabetically by last name
router.get('/sorted/last-name', async(req,res) => {
	const employees = await Employee.find().sort({lastName: 1})
	res.json(employees)
})

// ----- FILTERING ------
//3. find employees with a single specific certification
router.get('/certification/:cert', async(req, res) => {
	const employees = await Employee.find({certifications: req.params.cert})
	res.json(employees)
})

//4. Find employees with multiple specific certifications
//query string is a part of URL that assigns values to specific parameters, it's a common used pattern for filtering data, example: http://localhost:3000/employees/multiple/certifications?list=cpr,welding, "?list=cpr,welding" is the query string
router.get('/multiple/certifications', async(req, res) => {
	const certs = req.query.list.split(',')
	const employees = await Employee.find({certifications: {$all: certs}})
	res.json(employees)
})

//5. Find employees with some certifications who are available on specific days
router.get('/availability/and/certifications', async(req, res) => {
	//console.log(req.query.certs)
	const certs = req.query.certs.split(',')
	const days = req.query.availability.split(',')
	const employees = await Employee.find({certifications: {$all: certs}, availability: {$all: days}})
	res.json(employees)
})

//6. Find employees with some certifications who are available on specific days and have joined the company for more than X months
router.get('/availability/and/certifications/and/months', async(req, res) => {
	//console.log(req.query)
	const certs = req.query.certs.split(',')
	const days = req.query.availability.split(',')
	const months = req.query.months
	//console.log(new Date(Date.now() - months * 30 * 24 * 60 * 60 * 1000))
	const employees = await Employee.find({certifications: {$all: certs}, availability: {$all: days}, dateJoined: {$lte: new Date(Date.now() - months * 30 * 24 * 60 * 60 * 1000)}}) // $gt is greater than, $lt is less than, $gte is greater than or equal to, $lte is less than or equal to
	res.json(employees)
})

module.exports = router; // this is to export the router so we can use it in other files