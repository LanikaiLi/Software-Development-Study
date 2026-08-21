// this is a component which is used to display a city card
// components are just functions that return html
// components are functions!

import { flags } from './data'

function CityCard({city}){
    // here you need to use ({city}) instead of (city) because you are destructuring the city object
    // destructuring is a way to extract values from an object and assign them to variables
    return ( 
        <div key={city.name}>
          <h2>{city.name}</h2>
          <img src={city.image} alt={city.name} />
          <p>Population: {city.population.toLocaleString()}</p>
          <p>Country: {city.country}</p>
          <img src={flags[city.country]} alt={city.country} />
          <p>--------------------------------</p>
        </div>
      )
}

export default CityCard