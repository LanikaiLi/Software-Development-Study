const kmDistance = window.utils.getKmDistance

// 1. GET NEIGHBORS
// Return an array of directly connected city names for a given city.

// my logic:
// loop through the flights array 
// if the first element of the flight matches the city name, add the second element to the neighbors array
// if none of the first elements match the city name, see if the second element matches the city name
// if it does, add the first element to the neighbors array
// if neither element matches the city name, return an empty array

// deduplicate the neighbors array in the end

// my solution:
const getNeighbors = cityName => {
    let neighbors = [];
    for (let i = 0; i < graph.flights.length; i++) {
        if (graph.flights[i][0] === cityName) {
            neighbors.push(graph.flights[i][1]);
        } else if (graph.flights[i][1] === cityName) {
            neighbors.push(graph.flights[i][0]);
        }
    }
    neighbors = [...new Set(neighbors)];
    return neighbors;
}


// 2. MILEAGE
// Return fuel used in liters as an integer for a distance in km, with kmPerLiter representing the distance you can travel on one liter of fuel. Round to the nearest integer.
const kmPerLiter = 3
const getFuelConsumptionLiters = distanceKm => {
    return Math.round(distanceKm / kmPerLiter);
}


// 3. DIRECT FLIGHT
// Return true if two cities have a direct flight between them.

// my logic:
// check if any of flights[i] element matches city 1
// if so, check if the other element matches city 2
// if so, return true
// if not, return false

// my solution:
const hasDirectFlight = (city1, city2) => {
    for (let i = 0; i < graph.flights.length; i++) {
        if (graph.flights[i][0] === city1 && graph.flights[i][1] === city2) {
            return true;
        } else if (graph.flights[i][1] === city1 && graph.flights[i][0] === city2) {
            return true;
        }
    }
    return false;
}

// 4. JUST ONE TRANSFER
// Return true if city2 can be reached from city1 with one transfer or less.

// my logic:
// first check if there is a direct flight between city1 and city2
// if there is, return true
// if there is not, check if there is a flight from the direct neighbors of city1 to city2
// if there is, return true
// if there is not, return false

// my solution:
const hasOneTransferRoute = (city1, city2) => {
    if (hasDirectFlight(city1, city2)) {
        return true;
    } else {
        let neighbors = getNeighbors(city1);
        for (let i = 0; i < neighbors.length; i++) {
            if (hasDirectFlight(neighbors[i], city2)) {
                return true;
            }
        }
        return false;
    }
}

// 5. COUNT ALL CITIES
// Traverse from one city to count what total number of cities are reachable on the graph.

// my logic:
// use a queue to process the cities in order, start with the given city
// use another list to keep track of the cities that have been visited, at this point it should only have the given city
// for each city in the queue, count how many neighbors it has that have not been visited yet, and add them to the final number
// then add the neighbors to the queue, and add them to the visited list
// then for each city in the queue, repeat the process
// when the queue is empty, return the final number

const countAllCities = city => {
    let queue = [city];
    let visited = [city];
    let count = 1;
    while (queue.length > 0) {
        let currentCity = queue.shift();
        let neighbors = getNeighbors(currentCity);
        neighbors.forEach(neighbor => {
            if (!visited.includes(neighbor)) {
                queue.push(neighbor);
                visited.push(neighbor);
                count++;
            }
        });
    }
    return count;
}

// 6. PATH DISTANCE
// Add up the full distance in km of a path like ["Montreal", "Atlanta", "Guadalajara"].

// my logic:
// loop through the path array, and for each city, get the distance between the current city and the next city
// if the next city is empty, return the total distance
// if the next city is not empty, add the distance to the total distance and continue
// return the total distance

// my solution:
const getPathDistance = path => {
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
        if (path[i + 1] === undefined) {
            return totalDistance;
        }
        totalDistance += getKmDistance(path[i], path[i + 1]);
    }
    return totalDistance;
}

// 7. PATH FUEL CONSUMPTION
// Find the fuel used for a path (like ["Montreal", "Atlanta", "Guadalajara"]) in liters. Remember you can call the previous functions in this file as helpers.

// my logic:
// get total distance, then use the getFuelConsumptionLiters function to get the fuel consumption
const getPathFuelConsumption = path => {
    let totalDistance = getPathDistance(path);
    return getFuelConsumptionLiters(totalDistance);
}

// 8. FEWEST TRANSFERS
// Find the path from one city to another that requires the fewest transfers. Return an array of 3-letter airport codes.
// my logic:
// fewest transfers = shortest path on an unweighted graph, so explore level by level (BFS)
// each recursive call handles one whole level: it takes every path built so far that has the same length
// if any of those paths already ends at the end city, that is the fewest-transfers path
// otherwise grow each path by one unvisited neighbor, and recurse with the next level
// when a level is empty there is nothing left to explore, so return an empty array

// my solution:
const exploreLevel = (paths, visited, endCity) => {
    if (paths.length === 0) {
        return [];
    }

    let nextPaths = [];
    for (let i = 0; i < paths.length; i++) {
        let currentPath = paths[i];
        let currentCity = currentPath[currentPath.length - 1];

        if (currentCity === endCity) {
            return currentPath;
        }

        let neighbors = getNeighbors(currentCity);
        for (let j = 0; j < neighbors.length; j++) {
            if (!visited.includes(neighbors[j])) {
                visited.push(neighbors[j]);
                nextPaths.push([...currentPath, neighbors[j]]);
            }
        }
    }

    return exploreLevel(nextPaths, visited, endCity);
}

const getFewestTransfersPath = (startCity, endCity) => {
    let cityPath = exploreLevel([[startCity]], [startCity], endCity);
    return cityPath.map(city => graph.cities[city].code);
}

// alternative solution using BFS:
const getFewestTransfersPath_2 = (startCity, endCity) => {
    const queue = [startCity]
    const visited = {}
    const previous = {}
    visited[startCity] = true

    while (queue.length > 0) {
        const currentCity = queue.shift()
        if (currentCity === endCity) break

        for (const nextCity of getNeighbors(currentCity)) {
            if (!visited[nextCity]) {
                visited[nextCity] = true
                previous[nextCity] = currentCity
                queue.push(nextCity)
            }
        }
    }

    if (!visited[endCity]) return []

    const path = []
    let city = endCity

    while (city) {
        path.unshift(graph.cities[city].code)
        if (city === startCity) break
        city = previous[city]
    }

    return path
}

// 9. SHORTEST PATH
// Find the shortest-distance path and return an array of 3-letter airport codes.
const getShortestDistancePath = (startCity, endCity) => {}

// 10. FIND HUB CITY
// Return the name of the airport with the most direct connections.
const findHubCity = () => {}

window.getNeighbors = getNeighbors
window.getFuelConsumptionLiters = getFuelConsumptionLiters
window.hasDirectFlight = hasDirectFlight
window.hasOneTransferRoute = hasOneTransferRoute
window.countAllCities = countAllCities
window.getPathDistance = getPathDistance
window.getPathFuelConsumption = getPathFuelConsumption
window.getFewestTransfersPath = getFewestTransfersPath
window.getShortestDistancePath = getShortestDistancePath
window.findHubCity = findHubCity