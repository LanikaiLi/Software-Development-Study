const graph = {
  cities: {
    Montreal: { city: 'Montreal', code: 'YUL', airport: 'Montreal-Trudeau International Airport', lat: 45.4706, lon: -73.7408 },
    Atlanta: { city: 'Atlanta', code: 'ATL', airport: 'Hartsfield-Jackson Atlanta International Airport', lat: 33.6407, lon: -84.4277 },
    Guadalajara: { city: 'Guadalajara', code: 'GDL', airport: 'Guadalajara International Airport', lat: 20.5218, lon: -103.3112 },
    'Panama City': { city: 'Panama City', code: 'PTY', airport: 'Tocumen International Airport', lat: 9.0714, lon: -79.3835 },
    Prague: { city: 'Prague', code: 'PRG', airport: 'Vaclav Havel Airport Prague', lat: 50.1008, lon: 14.26 },
    Cairo: { city: 'Cairo', code: 'CAI', airport: 'Cairo International Airport', lat: 30.1219, lon: 31.4056 },
    Madrid: { city: 'Madrid', code: 'MAD', airport: 'Adolfo Suarez Madrid-Barajas Airport', lat: 40.4983, lon: -3.5676 },
    Lagos: { city: 'Lagos', code: 'LOS', airport: 'Murtala Muhammed International Airport', lat: 6.5774, lon: 3.3212 }
  },
  flights: [
    ['Montreal', 'Atlanta'],
    ['Guadalajara', 'Atlanta'],
    ['Cairo', 'Lagos'],
    ['Cairo', 'Prague'],
    ['Panama City', 'Atlanta'],
    ['Atlanta', 'Madrid'],
    ['Panama City', 'Lagos'],
    ['Madrid', 'Prague'],
    ['Madrid', 'Cairo']
  ]
}
