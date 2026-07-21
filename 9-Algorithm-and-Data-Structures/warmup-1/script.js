const borders = {
    Portugal: ["Spain"],
    Spain: ["Portugal", "France"],
    France: ["Spain", "Belgium", "Germany"],
    Belgium: ["France", "Germany"],
    Germany: ["France", "Belgium", "Poland"],
    Poland: ["Germany"]
}

// This object represents countries that border other countries. For example, Spain borders both Portugal and France.
// Write a function that takes in two countries, then returns an array depicting shortest path between the two. For example:
// shortestPath("Germany", "Portugal")
// Would return ["Germany", "France", "Spain", "Portugal"]

// my logic 1: find the shortest path from Location A to Location B actually means finding the shortest path from Location A to countries that border Location B, and so on so forth

// my logic 2: find all possible paths from Location A to Location B, then find the shortest path from the list of paths

// these logics are both not correct, SEE TEACHER'S CODE BELOW AND TRY TO FIND THE LOGIC BEHIND

const shortestPath = (start, end) => {
    if (start === end) return [start]

    const queue = [start]
    const visited = {}
    const previous = {}

    visited[start] = true
    previous[start] = null

    while (queue.length > 0) {
        const country = queue.shift()
        if (country === end) {
            break
        }

        for (const neighbor of borders[country]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true
                previous[neighbor] = country
                queue.push(neighbor)
            }
        }
    }
    const path = []
    let currentCountry = end

    while (currentCountry !== null) {
        path.push(currentCountry)
        currentCountry = previous[currentCountry]
    }

    return path.reverse()
}

console.log(
    shortestPath("Portugal", "Poland")
)

// NEED HELP FINDING THE LOGIC? TRY PLAYING WITH THE COMMENTS BELOW
// For a search from Portugal to Germany, at the end our data structures would look like this:
// QUEUE:
// VISITED: PORTUGAL, SPAIN, FRANCE, BELGIUM, GERMANY
// PREVIOUS: {SPAIN: PORTUGAL, FRANCE: SPAIN, BELGIUM: FRANCE, GERMANY: FRANCE}
// country: GERMANY

// DID YOU FIND THE LOGIC? LOL THE ANSWER IS:  JUST imagine you are travelling with camels in ancient times and you have to find out the shortest path for. the emperor, what will you do?

// sometimes the most difficult theories are the simplest ones if you stop thinking too much!