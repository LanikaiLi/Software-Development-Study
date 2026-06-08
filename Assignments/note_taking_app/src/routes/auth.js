const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const supabase = require('../db') // import the supabase client from the db.js file, .js is optional

// ------------------------------------------------------------
// 1. register a new user
// ------------------------------------------------------------

router.post('/user/register', async(req, res) => {
    const username = req.body.username
    const password = req.body.password

    const password_hash = await bcrypt.hash(password, 10) // bcrypt is a library for hashing passwords

    newUser = {
        username: username,
        password_hash: password_hash
    }

    const {data, error} = await supabase
    .from('users')
    .insert(newUser)
    .select()
    
    if (error) {
        return res.status(500).json({ error: error.message })
    }

    return res.status(201).json({message: 'User registered successfully'})
})

// ------------------------------------------------------------
// 2. login a user
// ------------------------------------------------------------

router.post('/user/login', async(req, res) => {
    const username = req.body.username
    const password = req.body.password
    let token = null

    const {data, error} = await supabase
    .from('users')
    .select('*')
    .eq('username', username) 
    .single() // single() is used to get a single row from the database, if there are multiple rows, it will return an error

    if (!data) {
        return res.status(401).json({ error: 'Invalid username or password' })
    }
    
    const valid = await bcrypt.compare(password, data.password_hash)
    if (!valid) {
        return res.status(401).json({ error: 'Invalid password' })
    }else {
            token = jwt.sign(
            { userId: data.id },
            process.env.JWT_SECRET,
            { expiresIn: '5d' }
        )
    }
    return res.status(200).json({ message: 'User logged in successfully', token: token })
})

// ------------------------------------------------------------
// export the router
// ------------------------------------------------------------

module.exports = router