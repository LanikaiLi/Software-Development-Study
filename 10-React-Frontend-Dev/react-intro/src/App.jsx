// this is a component
// react components are just functions that return html
// they are used in main.jsx and then main.jsx is used in index.html

import './App.css'
import { cities} from './data'
import CityCard from './CityCard'

function App() {
  // <> means this is html
  // {} means this is javascript
  // yes! react is indeed very flexible and easy to use
  return (
    <> 
      {cities.map(city => {
        return ( 
          <CityCard key={city.name} city={city} />
        )
      })}
    </>
  )
}

export default App
