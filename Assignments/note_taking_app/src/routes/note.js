const express = require('express')
const router = express.Router()
const supabase = require('../db')
const requireAuth = require('../middleware/auth') 

// ------------------------------------------------------------
// 1. create a new note
// ------------------------------------------------------------

router.post('/create', requireAuth, async(req, res) => {
    const title = req.body.title
    const body = req.body.body
    const userId = req.userId

    newNote = {
        title: title,
        body: body,
        user_id: userId
    }

    const {data, error} = await supabase
    .from('notes')
    .insert(newNote)
    .select()

    if (error) {
        return res.status(500).json({ error: error.message })
    }

    return res.status(201).json({message: 'Note created successfully', note: data })
    
})

// ------------------------------------------------------------
// export the router
// ------------------------------------------------------------

module.exports = router