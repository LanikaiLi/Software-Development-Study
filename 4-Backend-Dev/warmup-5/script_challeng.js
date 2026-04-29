// Challenge version:

const gladiator2 = {
    title: 'Gladiator 2',
    starring: ['Paul Mescal','Denzel Washington', 'Connie Nielsen', 'Pedro Pascal'],
    year: 2024,
    director: {
        name: "Ridley Scott",
        birthdate: -1006819200000,
    },
    screenwriter: "David Scarpa",
    lengthInMinutes: 148
}

// my logic: use string interpolation to construct the string, but lenthInMinutes need to be converted to hours and minutes. and starring needs to be first converted to a string that is joined by 'and', then use that string in the string interpolation.
const describeMovie = (movie) => {
    let hours = Math.floor(movie.lengthInMinutes / 60)
    let minutes = movie.lengthInMinutes % 60
    let starringString = movie.starring.join(" and ")
    console.log(starringString)
    return `${movie.title} is a ${movie.year} movie starring ${starringString}. It was written by ${movie.screenwriter} and directed by ${movie.director.name}. It's ${hours} hours and ${minutes} minutes long.`
}

console.log(describeMovie(gladiator2))
