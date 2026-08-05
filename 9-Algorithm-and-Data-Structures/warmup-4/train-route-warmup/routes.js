montreal = { name: "Montreal", connections: [] }
ottawa = { name: "Ottawa", connections: [] }
kingston = { name: "Kingston", connections: [] }
burlington = { name: "Burlington", connections: [] }
quebec = { name: "Quebec", connections: [] }

const makeConnection = (array) => {
    const first = array[0]
    const second = array[1]
    first.connections.push(second)
    second.connections.push(first)
}

const connections = [
    [montreal, ottawa],
    [ottawa, kingston],
    [montreal, burlington],
    [montreal, quebec],
]

connections.forEach(connection => {
    makeConnection(connection)
})

console.log(montreal)
console.log(ottawa)
console.log(kingston)
console.log(burlington)
console.log(quebec)

// Write a function that returns true if two cities are adjacent, or false if
// they are not. For example: isAdjacent(montreal, ottawa) returns true, but
// isAdjacent(burlington, quebec) returns false

// my logic: if the first city's connection is second city and second city's connection is first city, then they are adjacent.
isAdjacent = (firstCity, secondCity) => {
    return firstCity.connections.includes(secondCity) && secondCity.connections.includes(firstCity)
}

console.log("######## isAdjacent ########")
console.log(isAdjacent(montreal, ottawa))
console.log(isAdjacent(burlington, quebec))

// Return the number of nodes in between the first city and the second.

distanceBetween = (firstCity, secondCity) => {
    const queue = [{city: firstCity, distanceAway: 0}]
    const checked = {}

    while (queue.length > 0) {
        let current = queue.shift()
        let currentCity = current.city
        let depth = current.distanceAway
        checked[currentCity.name] = true
        if (currentCity.name === secondCity.name) {
            return depth - 1
        }
        currentCity.connections.forEach(city => {
            if (!checked[city.name]) {
                queue.push({city: city, distanceAway: depth + 1})
            }
        })
    }
}

console.log("######## distanceBetween ########")
//console.log(burlington.connections[0])
console.log(distanceBetween(burlington, kingston))