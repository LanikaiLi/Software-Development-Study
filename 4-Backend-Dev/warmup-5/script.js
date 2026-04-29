// April 28th Warmup:

const gladiator2 = {
    title: 'Gladiator 2',
    starring: ['Paul Mescal','Denzel Washington'],
    year: 2024,
    director: {
        name: "Ridley Scott",
        birthdate: -1006819200000,
    },
    screenwriter: "David Scarpa",
    lengthInMinutes: 148
}

// Write a function called describeMovie that takes in the above object and returns the following string:
"Gladiator 2 is a 2024 movie starring Paul Mescal and Denzel Washington. It was written by David Scarpa and directed by Ridley Scott. It's 2 hours and 28 minutes long."

// my logic: use string interpolation to construct the string, but lenthInMinutes need to be converted to hours and minutes.
const describeMovie = (movie) => {
    let hours = Math.floor(movie.lengthInMinutes / 60)
    let minutes = movie.lengthInMinutes % 60
    return `${movie.title} is a ${movie.year} movie starring ${movie.starring.join(" and ")}. It was written by ${movie.screenwriter} and directed by ${movie.director.name}. It's ${hours} hours and ${minutes} minutes long.`
}

console.log(describeMovie(gladiator2))
// Here's another movie object to test with:
const barbie = {
    title: "Barbie",
    starring: ["Margot Robbie", "Ryan Gosling"],
    year: 2023,
    director: {
        name: "Greta Gerwig",
        birthdate: 428198400000,
    },
    screenwriter: "Greta Gerwig & Noah Baumbach",
    lengthInMinutes: 114,
}

console.log(describeMovie(barbie))
// Challenge version:

// const gladiator2 = {
//     title: 'Gladiator 2',
//     starring: ['Paul Mescal','Denzel Washington', 'Connie Nielsen', 'Pedro Pascal'],
//     year: 2024,
//     director: {
//         name: "Ridley Scott",
//         birthdate: -1006819200000,
//     },
//     screenwriter: "David Scarpa",
//     lengthInMinutes: 148
// }