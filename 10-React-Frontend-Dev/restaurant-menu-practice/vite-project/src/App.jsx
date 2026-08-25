import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { menu } from './data'
import Starters from './Starters'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Restaurant Menu</h1>
    <h2>Starters</h2>
    <Starters starters={menu.starters} />
    <h2>Mains</h2>
    <ul>
      {
        menu.mains.map((main_item) => (
          <li key={main_item.name}>{main_item.name} - {main_item.price}</li>
        ))
      }
    </ul>
    <h2>Desserts</h2>
    <ul>
      {
        menu.desserts.map((dessert_item) => (
          <li key={dessert_item.name}>{dessert_item.name} - {dessert_item.price}</li>
        ))
      }
    </ul>
    </>
  )
}

export default App
