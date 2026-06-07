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
// export the router
// ------------------------------------------------------------

module.exports = router