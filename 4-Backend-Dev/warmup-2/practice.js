const cities = [
    {"name":"Ottawa","population":1017449,"lat":45.411,"lng":-75.698,"id":1},
    {"name":"Calgary","population":1306784,"lat":51.05,"lng":-114.085,"id":2},
    {"name":"Toronto","population":2794356,"lat":43.706,"lng":-79.399,"id":3},
    {"name":"Montreal","population":1762949,"lat":45.509,"lng":-73.588,"id":4},
    {"name":"Winnipeg","population":749607,"lat":49.884,"lng":-97.147,"id":5},
    {"name":"Mississauga","population":717961,"lat":43.579,"lng":-79.658,"id":6},
    {"name":"Edmonton","population":1010899,"lat":53.55,"lng":-113.469,"id":7},
]

const highestPopulation = (cityList) => {
    // Write this function to take in the above list and return the city with the highest population.
    // my logic: loop through the array and compare the population of each city, if the population is higher, update the dummy variable, finally return the dummy variable.
    let highestPopulation = cityList[0]
    cities.forEach(city => {
        if (city.population > highestPopulation.population) {
            highestPopulation = city
        }
    })
    return highestPopulation
}

console.log(highestPopulation(cities))

const highestPopulation_2 = (cityList) => {
    // my logic: sort the array by population, then return the first element.
    const highestPopulation = (cityList) => cities.reduce((biggest, city) => city.population > biggest.population ? city : biggest, cityList[0])
    return highestPopulation
}

console.log(highestPopulation_2(cities))
// If you finish early: try writing a function that sorts the cities from lowest population to highest.