const countries = [
    { name: "Belgium", population: 11800000, continent: "Europe", capital: "Brussels" },
    { name: "Brazil", population: 211000000, continent: "South America", capital: "Brasília" },
    { name: "Canada", population: 41000000, continent: "North America", capital: "Ottawa" },
    { name: "Chile", population: 19600000, continent: "South America", capital: "Santiago" },
    { name: "Egypt", population: 112000000, continent: "Africa", capital: "Cairo" },
    { name: "Japan", population: 123000000, continent: "Asia", capital: "Tokyo" },
    { name: "Mongolia", population: 3500000, continent: "Asia", capital: "Ulaanbaatar" },
    { name: "Sudan", population: 50000000, continent: "Africa", capital: "Khartoum" },
    { name: "Uruguay", population: 3400000, continent: "South America", capital: "Montevideo" },
];

// II: Write a function that returns only the countries on this list which both:
// A) Are in either Africa or Europe
// and B) Have a population of less than 60 million.

// my logic: loop throug the array and check : if the continent is Africa or Europe and the population is less than 60 million, add the country to the new array. return the new array.

const filterCountries = (countries_list) => {
    let filteredCountries = []
    countries_list.forEach(country => {
        // here it is very important to use () to group country.continent === "Africa" and country.continent === "Europe" together, because if you just say "country.continent === "Africa" || country.continent === "Europe" && country.population < 60000000", it will return you contries that are in africa but not having population < 60000000, because of that OR operator, as long as as country.continent === "Africa" is true it will return true for the whole formula
        if ((country.continent === "Africa" || country.continent === "Europe") && country.population < 60000000) {
            filteredCountries.push(country)
        }
    })
    return filteredCountries
}

// alternative solution: use the filter method and include method
const getSmallAfricanAndEuropeanCountries = () => {
    return countries.filter(country => (
        ["Africa", "Europe"].includes(country.continent)) && country.population < 60000000
    )
}

console.log(filterCountries(countries))