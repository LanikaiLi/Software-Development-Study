what I did to  generate package.json: npm init

to setup a folder to work on backend, you need to :
1. first step: npm init
2. second step: npm install express

don't forget to gitignore node_modules and package-lock.json, so if someone downloads your code, they can just run npm install to start working

it is suggested to change the main from index.js to main.js in the package.json file, index.js is the default one machine generated