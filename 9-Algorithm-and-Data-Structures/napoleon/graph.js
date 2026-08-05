let graph = {
  cities: {
    'Dublin': { name:'Dublin', lat: 53.3498, lon: -6.2603, pop: 175000 },
    'London': { name:'London', lat: 51.5074, lon: -0.1278, pop: 1100000 },
    'Paris': { name:'Paris', lat: 48.8566, lon: 2.3522, pop: 550000 },
    'Amsterdam': { name:'Amsterdam', lat: 52.3676, lon: 4.9041, pop: 203000 },
    'Berlin': { name:'Berlin', lat: 52.52, lon: 13.405, pop: 172000 },
    'Vienna': { name:'Vienna', lat: 48.2082, lon: 16.3738, pop: 250000 },
    'Warsaw': { name:'Warsaw', lat: 52.2297, lon: 21.0122, pop: 63400 },
    'St. Petersburg': { name:'St. Petersburg', lat: 59.9311, lon: 30.3609, pop: 220000 },
    'Moscow': { name:'Moscow', lat: 55.7558, lon: 37.6173, pop: 250000 },
    'Istanbul': { name:'Istanbul', lat: 41.0082, lon: 28.9784, pop: 570000 },
    'Cairo': { name:'Cairo', lat: 30.0444, lon: 31.2357, pop: 260000 },
    'Tripoli': { name:'Tripoli', lat: 32.8872, lon: 13.1913, pop: 30000 },
    'Algiers': { name:'Algiers', lat: 36.7538, lon: 3.0588, pop: 30000 },
    'Marrakesh': { name:'Marrakesh', lat: 31.6295, lon: -7.9811, pop: 50000 },
    'Lisbon': { name:'Lisbon', lat: 38.7223, lon: -9.1393, pop: 204000 },
    'Madrid': { name:'Madrid', lat: 40.4168, lon: -3.7038, pop: 170000 },
    'Marseilles': { name:'Marseilles', lat: 43.2965, lon: 5.3698, pop: 96413 },
    'Rome': { name:'Rome', lat: 41.9028, lon: 12.4964, pop: 150000 }
  },
  connections: [
    ['Dublin', 'London'],
    ['London', 'Paris'],
    ['London', 'Amsterdam'],
    ['Paris', 'Amsterdam'],
    ['Amsterdam', 'Berlin'],
    ['Berlin', 'Vienna'],
    ['Berlin', 'Warsaw'],
    ['Warsaw', 'Vienna'],
    ['Warsaw', 'St. Petersburg'],
    ['St. Petersburg', 'Moscow'],
    ['Moscow', 'Istanbul'],
    ['Istanbul', 'Cairo'],
    ['Cairo', 'Tripoli'],
    ['Tripoli', 'Algiers'],
    ['Algiers', 'Marrakesh'],
    ['Marrakesh', 'Lisbon'],
    ['Lisbon', 'Madrid'],
    ['Madrid', 'Marseilles'],
    ['Paris', 'Madrid'],
    ['Paris', 'Marseilles'],
    ['Marseilles', 'Rome'],
    ['Vienna', 'Rome'],
    ['Rome', 'Istanbul']
  ]
}

for (const cityName of Object.keys(graph.cities)) {
  const city = graph.cities[cityName]
  city.neighbors = []
  city.selected = false
  city.select = () => {
    city.selected = !city.selected
    city.onSelectionChange(cityName, city.selected)
  }
}

for (const connection of graph.connections) {
  const fromCity = graph.cities[connection[0]]
  const toCity = graph.cities[connection[1]]

  fromCity.neighbors.push(toCity)
  toCity.neighbors.push(fromCity)
}

const select = function (cityName) {
  const city = this.cities[cityName]
  if (!city) return false

  return city.select()
}

graph.select = select

const paris = graph.cities['Paris']

console.log(graph.cities['Paris'])
