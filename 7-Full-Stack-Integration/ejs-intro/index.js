// notice how this is index.js rather than index.html now
// this is the controller, in the MVC architecture
const path = require('path');
const ejs = require('ejs');
const express = require('express');

//the file path that will lead to thhe hello.ejs template
// __dirname is a global variable that gives the current directory of the file, in this case, it is 7-Full-Stack-Integration/recipe-display-ejs-app
const templatePath = path.join(__dirname, 'views', 'hello.ejs');

//create an express app
const app = express();

//define a route for the root path
app.get('/', (request, response) => {
    //render the template with the data
    ejs.renderFile(templatePath, { name: 'John' }, (error, html) => { // takes in the template path, a variable and a function, note that the function will always be doing the same logic of sending the html and catching the error
        if (error) {
            response.status(500).send('Error rendering template');
        } else {
            response.send(html);
        }
    })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
