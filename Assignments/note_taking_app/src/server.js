// ------------------------------------------------------------
// 1. Connect to Supabase
// ------------------------------------------------------------

// require the necessary libraries
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()


// create a supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  )
  
// test the connection
async function testConnection() {
  const { data, error } = await supabase.from('notes').select('*').limit(1);

  if (error) {
    console.error('Connection/query failed:', error.message);
  } else {
    console.log('Connected! Sample data:', data);
  }
}

testConnection();

// ------------------------------------------------------------
// 2. set up the server
// ------------------------------------------------------------

// require the necessary libraries
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('服务器运行成功！');
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

// ------------------------------------------------------------
// 3. set up the routes
// ------------------------------------------------------------

app.use(express.json());

app.post('/notes', async(req, res) => {
  //console.log(req.body);
  //res.status(201).json(req.body);

  const title = req.body.title;
  const body = req.body.body;

  const newNote = {
    title: title,
    body: body
  }

  const {data, error} = await supabase
  .from('notes')
  .insert(newNote)
  .select()

  if (error) {
    console.error('Error creating note:', error.message);
    res.status(500).json({error: 'Failed to create note'});
  } else {
    res.status(201).json(data);
  }
});