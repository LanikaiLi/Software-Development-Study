const express = require('express')
const router = express.Router()
const supabase = require('../db')
const requireAuth = require('../middleware/auth') 
const { updateSearchIndex } = require('../../../../4-Backend-Dev/mongoose-project/src/models/EmployeeObject')

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
// 2. get all notes
// ------------------------------------------------------------

router.get('/get', requireAuth, async(req, res) => {
    const userId = req.userId

    const {data, error} = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)

    if (error) {
        return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({notes: data })
})

// ------------------------------------------------------------
// 3. delete a note by id
// ------------------------------------------------------------
router.delete ('/delete/:id', requireAuth, async(req, res) => {
    const id = req.params.id
    const userId = req.userId

    const {data, error} = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

    if (error) {
        return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({message: 'Note deleted successfully'})
})

// ------------------------------------------------------------
// 4. update a note by id
// ------------------------------------------------------------
router.patch('/:id', requireAuth, async(req, res) => {
    const id = req.params.id
    const userId = req.userId
    const title = req.body.title
    const body = req.body.body

    const updates = {}
    if (title !== undefined) {
        updates.title = title
    }
    if (body !== undefined) {
        updates.body = body
    }

    const {data, error} = await supabase
    .from('notes')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId)
    .select()

    if (error) {
        return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({message: 'Note updated successfully', note: data })
})

// ------------------------------------------------------------
// export the router
// ------------------------------------------------------------

module.exports = router