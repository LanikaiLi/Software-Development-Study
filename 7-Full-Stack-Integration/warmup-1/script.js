let cities = [
    { name: "Boston", country: "United States of America", region: "Massachusetts" },
    { name: "Mexico City", country: "Mexico", region: "Valley of Mexico" },
    { name: "Montreal", country: "Canada", region: "Quebec" },
    { name: "Havana", country: "Cuba", region: "La Habana Province" },
    { name: "Atlanta", country: "United States of America", region: "Georgia" },
    { name: "Vancouver", country: "Canada", region: "British Columbia" },
    { name: "Lima", country: "Peru", region: "Lima Province" }
];

// This is a list of cities in which a touring event is being held. Write a function that takes in this list and returns a new list of all the countries where the event is happening, without duplicates.

function getCountries(cities) {
    return cities.map(city => city.country);
}


new_cities = getCountries(cities);
console.log(new_cities);