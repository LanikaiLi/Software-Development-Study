const distanceBetweenKM = (cityA, cityB) => {
	const toRadians = degrees => (degrees * Math.PI) / 180
	const lat1 = toRadians(cityA.lat)
	const lon1 = toRadians(cityA.lon)
	const lat2 = toRadians(cityB.lat)
	const lon2 = toRadians(cityB.lon)
	const dLat = lat2 - lat1
	const dLon = lon2 - lon1

	const a =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2

	return Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
}

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
        currentCity.neighbors.forEach(city => {
            if (!checked[city.name]) {
                queue.push({city: city, distanceAway: depth + 1})
            }
        })
    }
}