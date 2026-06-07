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

// ------------------------------------------------------------
// 2. test the client connection
// ------------------------------------------------------------

// test the connection
// async function testConnection() {
//   const { data, error } = await supabase.from('notes').select('*').limit(1);

//   if (error) {
//     console.error('Connection/query failed:', error.message);
//   } else {
//     console.log('Connected! Sample data:', data);
//   }
// }

// testConnection();

// ------------------------------------------------------------
// 3. export the supabase client
// ------------------------------------------------------------
module.exports = supabase