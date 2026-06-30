let petStoreClients = [
    {
        name: "Rachel M.",
        dog: { name: "Riley", age: 4 },
        cat: { name: "Rembrandt", age: 6 },
        phone: "514-555-1234",
        location: "Montreal"
    },
    {
        name: "Sara K.",
        cat: { name: "Mochi", age: 2 },
        phone: "416-555-5678",
        location: "Toronto"
    },
    {
        name: "Max T.",
        dog: { name: "Comet", age: 3 },
        phone: "647-555-9123",
        location: "Toronto"
    },
    {
        name: "Marco S.",
        cat: { name: "Biscuit", age: 5 },
        phone: "403-555-9123",
        location: "Calgary"
    }
]

getCatInfo = (clients) => {
    /* return a list of all the cats in the following format:
    {
        name: "Rembrandt",
        age: 6,
        owner: "Rachel M."
        location: "Montreal"
    }
    */

    let cats = []
    clients.forEach(client => {
        if (client.cat) {
            cat = {
                name: client.cat.name,
                age: client.cat.age,
                owner: client.name,
                location: client.location
            }
            cats.push(cat)
        }
    })
    return cats
}

getDogInfo = (clients) => {
    /* same as above, but for dogs instead of cats */
    let dogs = []
    clients.forEach(client => {
        if (client.dog) {
            dog = {
                name: client.dog.name,
                age: client.dog.age,
                owner: client.name,
                location: client.location
            }
            dogs.push(dog)
        }
    })
    return dogs
}

console.log("Cats:")
cats = getCatInfo(petStoreClients)
console.log(cats)

console.log("Dogs:")
dogs = getDogInfo(petStoreClients)
console.log(dogs)

// alternative solution using array methods:
console.log("Cats (alternative):")
cats = petStoreClients.filter(client => client.cat).map(client => ({
    name: client.cat.name,
    age: client.cat.age,
    owner: client.name,
    location: client.location
}))
console.log(cats)

console.log("Dogs (alternative):")
dogs = petStoreClients.filter(client => client.dog).map(client => ({
    name: client.dog.name,
    age: client.dog.age,
    owner: client.name,
    location: client.location
}))
console.log(dogs)

// alternative solution applying DRY principle:
getPetInfo = (animal, clients) => clients.filter(client => client[animal]).map(client => {
    return {
        name: client[animal].name,  // note here we use [] around 'animal' instead of . because 'animal' is a variable and not a property of the object.
        age: client[animal].age, 
        owner: client.name, 
        location: client.location
    }
})

console.log("Cats (DRY):")
getCatInfo = (clients) => getPetInfo("cat", clients)
console.log(cats)

console.log("Dogs (DRY):")
getDogInfo = (clients) => getPetInfo("dog", clients)