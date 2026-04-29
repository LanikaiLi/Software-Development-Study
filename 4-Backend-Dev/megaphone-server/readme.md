To setup, run these commands below:

1. npm init
2. npm install express
3. npm install dotenv
4. touch .env
5. npm install mongodb
6. save your mongo db connection string in the .env file
7. create the server.js fileusing mongodb's full code sample for connection string
8. change the uri var to const uri = process.env.MONGODB_URI in the server.js file
9. add 'require('dotenv').config();' on the beginning of the server.js file
10. create gitignore file with:
   'node_modules/*
   .env'


Tip: env file is kind of like config file, but different, config files are public shared within a team, package.json is more like a config file