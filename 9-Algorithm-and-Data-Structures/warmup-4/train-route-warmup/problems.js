// Write a function that returns true if two cities are adjacent, or false if
// they are not. For example: isAdjacent(montreal, ottawa) returns true, but
// isAdjacent(burlington, quebec) returns false

// my logic: if the first city's connection is second city and second city's connection is first city, then they are adjacent.
isAdjacent = (firstCity, secondCity) => {
    return firstCity.connections.includes(secondCity) && secondCity.connections.includes(firstCity)
}

console.log(isAdjacent(montreal, ottawa))
console.log(isAdjacent(burlington, quebec))

// Return the number of nodes in between the first city and the second.

// my logic: we use first city.connection.connection.connection... until we find the second city. count the number of layers until we find the second city.
distanceBetween = (firstCity, secondCity) => {
    let count = 0
    let currentCity = firstCity
    while (currentCity !== secondCity) {
        currentCity = currentCity.connections[0]
        count++
    }
    return count
}

console.log(distanceBetween(montreal, ottawa))
console.log(distanceBetween(montreal, quebec))
console.log(distanceBetween(montreal, burlington))
console.log(distanceBetween(montreal, kingston))
console.log(distanceBetween(ottawa, quebec))
console.log(distanceBetween(ottawa, burlington))
console.log(distanceBetween(ottawa, kingston))
console.log(distanceBetween(quebec, burlington))
console.log(distanceBetween(quebec, kingston))
console.log(distanceBetween(burlington, kingston))