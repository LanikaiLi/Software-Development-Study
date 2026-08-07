// Convert degrees to radians for distance calculations.
const toRadians = degrees => degrees * (Math.PI / 180)

// Return a city object from a city name or from an existing city object.
const getCityFromGraph = city => (typeof city === 'string' ? graph.cities[city] : city)

// Calculate and round the distance between two cities in kilometers.
const getKmDistance = (city1, city2) => {
  const from = getCityFromGraph(city1)
  const to = getCityFromGraph(city2)

  const lat1 = toRadians(from.lat)
  const lat2 = toRadians(to.lat)
  const deltaLat = toRadians(to.lat - from.lat)
  const deltaLon = toRadians(to.lon - from.lon)

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2)

  return Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
}

window.utils = { toRadians, getCityFromGraph, getKmDistance }
