const animals = ["purple horse", "white hamster", "blue dog", "yellow cat", "green horse", "red dog", "blue snake", "orange fox", "yellow horse", "black cat", "red snake", "brown hamster", "brown dog", "blue fox"]

// Write a function called filterByColor that takes in an array like the one above and returns a new array containing only the animals of a certain color. For example:
// filterByColor("blue")
// Should return --> ["blue dog", "blue snake", "blue fox"]

// If you finish early, here's a more challenging part two: write a function called mostCommonAnimal that takes in the same array and returns the type of animal that's the most common on the list, regardless of color. For example, for the above list it would return "dog"

// my logic: loop through the array anb store the picked ones in a new array, how to pick? i change each item to a tuple, and i only check the first element of the tuple.

const filterByColor = (animals, color) => {
    let filteredAnimals = []
    for (let i = 0; i < animals.length; i++) {
        let animal = animals[i].split(" ")
        if (animal[0] === color) {
            filteredAnimals.push(animals[i])
        }
    }
    return filteredAnimals
}

console.log(filterByColor(animals, "blue"))