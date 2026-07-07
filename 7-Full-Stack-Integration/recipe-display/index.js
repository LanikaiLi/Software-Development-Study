const path = require('path')
const ejs = require('ejs')
const express = require('express')

const templatePath = './views/recipes.ejs'
const app = express()

app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/views/index.html`)
})

const recipes = [
    {
        name: "Egg and Toast",
        ingredients: ['bread', 'butter', 'egg', 'salt', 'pepper'],
        vegetarian: true
    },
    {
        name: "Pasta Primavera",
        ingredients: ['pasta', 'olive oil', 'garlic', 'zucchini', 'cherry tomatoes', 'parmesan'],
        vegetarian: true
    },
    {
        name: "Chicken Tacos",
        ingredients: ['tortillas', 'chicken', 'onion', 'cilantro', 'lime', 'salsa'],
        vegetarian: false
    },
    {
        name: "Berry Smoothie",
        ingredients: ['strawberries', 'blueberries', 'banana', 'yogurt', 'honey'],
        vegetarian: true
    },
    {
        name: "Spaghetti and Meatballs",
        ingredients: ['spaghetti', 'ground beef', 'breadcrumbs', 'egg', 'tomato sauce', 'garlic', 'onion'],
        vegetarian: false
    },
]

app.get('/recipes', (request, response) => {
    const vegOnly = request.query.vegOnly
    let loadRecipes = recipes
    if (vegOnly) {
        loadRecipes = recipes.filter(recipe => recipe.vegetarian)
    }
    ejs.renderFile(templatePath, { recipes: loadRecipes }, (error, html) => {
        if (error) {
            response.status(500)
        } else {
            response.send(html)
        }
    })
})

app.listen(3000, () => {
    console.log("Listening on localhost:3000.")
})