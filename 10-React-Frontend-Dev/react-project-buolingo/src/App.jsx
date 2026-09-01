import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch('https://j-goodman.github.io/language-class-data/data/class-list.json').then(response => response.json()).then(data => setCourses(data))
  }, [])

  return (
    <div>
      {courses[0]?.language} {courses}
    </div>
  )
}

export default App
