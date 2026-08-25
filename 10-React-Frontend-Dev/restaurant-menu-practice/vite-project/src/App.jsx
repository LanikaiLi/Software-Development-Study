import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { menu } from './data'
import Starters from './Starters'
import Mains from './Mains'
import Desserts from './Desserts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Restaurant Menu</h1>
    <h2>Starters</h2>
    <Starters starters={menu.starters} />
    <h2>Mains</h2>
    <Mains mains={menu.mains} />
    <h2>Desserts</h2>
    <Desserts desserts={menu.desserts} />
    </>
  )
}

export default App
