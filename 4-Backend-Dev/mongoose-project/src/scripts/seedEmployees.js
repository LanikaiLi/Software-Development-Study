require('dotenv').config()

const mongoose = require('mongoose')
const Employee = require('../models/EmployeeObject')
const employeesToSeed = require('./seedData.json')

const runSeed = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI)
		await Employee.deleteMany({})
		const inserted = await Employee.insertMany(employeesToSeed)
		console.log(`Seed complete: inserted ${inserted.length} employees`)
	} catch (error) {
		console.error('Seed failed:', error.message)
	} finally {
		await mongoose.connection.close()
	}
}

runSeed()