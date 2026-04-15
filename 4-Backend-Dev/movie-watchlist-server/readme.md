what I did to  generate package.json: npm init

to setup a folder to work on backend, you need to :
1. first step: npm init
2. second step: npm install express

don't forget to gitignore node_modules and package-lock.json, so if someone downloads your code, they can just run npm install to start working

it is suggested to change the main from index.js to main.js in the package.json file, index.js is the default one machine generated

## server.js breakdown

`const express = require('express')` — imports the Express library into the file. `require()` is how Node.js loads installed packages from node_modules.

`const app = express()` — calls the express function to create a new application instance. This `app` object is what you use to define routes, set up middleware, and start the server.