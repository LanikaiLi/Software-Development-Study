what I did to  generate package.json: npm init

to setup a folder to work on backend, you need to :
1. first step: npm init
2. second step: npm install express

don't forget to gitignore node_modules and package-lock.json, so if someone downloads your code, they can just run npm install to start working

it is suggested to change the main from index.js to main.js in the package.json file, index.js is the default one machine generated

## server.js breakdown

`const express = require('express')` — imports the Express library into the file. `require()` is how Node.js loads installed packages from node_modules.

`const app = express()` — calls the express function to create a new application instance. This `app` object is what you use to define routes, set up middleware, and start the server.

##  what is a port?
A port is a numbered endpoint on your computer that identifies a specific process or service. Think of it like this:
- Your computer's IP address is like a building's street address — it gets traffic to the right machine.
- A port is like a room number inside that building — it directs traffic to the right application running on that machine.
Your computer has 65,535 available ports. Some are reserved for well-known services:
- Port 80 — HTTP (web traffic)
- Port 443 — HTTPS (secure web traffic)
- Port 22 — SSH
When you set const port = 3000, you're telling Express: "listen for incoming requests on room 3000." That's why when you visit your server in a browser, you go to http://localhost:3000 — localhost is the machine (your own computer), and 3000 is the port.
Port 3000 is a common convention for local development servers — it's high enough to avoid conflicts with system services and doesn't require admin privileges (ports below 1024 do).