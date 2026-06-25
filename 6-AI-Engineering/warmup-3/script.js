/* Write a function that takes in a Javascript object and validates it, returning a boolean. The object describes a city, it must have the following fields with the following type values:
{ name: <string>, population: <integer>, country: <string>, isCapital: <boolean> }

For example, this object is valid (the function should return true):
{ name: "Buffalo", population: 278349, country: "USA", isCapital: false }

But this one is not valid (the function should return false):
{ name: "Ottawa", population: "1,017,449", isCapital: "true" }

It's invalid because it's missing a required field (country), and because the population and isCapital fields are both strings, instead of being a number and a boolean.*/

// my logic: first check if all the fields are existing, then check if each field's content is the correct type, both of these two booleans return true is true, either one false will result a final false

// const validateCity = (city) => {
//     let cityExists = true
//     let cityInfoCorrect = true
//     if (!city.name || !city.population || !city.country || !city.isCapital) {
//         cityExists = false
//     }
//     if (typeof city.name !== "string" || typeof city.population !== "number" || typeof city.country !== "string" || typeof city.isCapital !== "boolean") {
//         cityInfoCorrect = false
//     }
//     console.log(cityExists)
//     console.log(cityInfoCorrect)
//     return cityExists && cityInfoCorrect
// }

const validateCity = city => !!city &&
typeof city.name === "string" &&
Number.isInteger(city.population) &&
typeof city.country === "string" &&
typeof city.isCapital === "boolean"

console.log(validateCity({ name: "Buffalo", population: 278349, country: "USA", isCapital: false }))
console.log(validateCity({ name: "Ottawa", population: "1,017,449", isCapital: "true" }))