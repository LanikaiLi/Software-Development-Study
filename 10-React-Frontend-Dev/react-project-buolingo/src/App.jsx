import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [courses, setCourses] = useState([])
  const [languages, setLanguages] = useState([])

  useEffect(() => {
    fetch('https://j-goodman.github.io/language-class-data/data/class-list.json').then(response => response.json()).then(data => setCourses(data))
  }, [])

  useEffect (() => {
    fetch("https://j-goodman.github.io/language-class-data/data/languages.json").then(response => response.json()).then(data => setLanguages(data.languages))
  })

  const course = courses[0]
  const language = languages.find(lang => lang.language === course?.language)

  return (
    <div>
      {course && (
        <div>
          <h1>
            <img src = {language?.['flag-icon']} alt={course.language} />
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}  {course.language} with {course.teacher}
          </h1>
          <p>{course.description}</p>
          <ul>
            <li>Days: {course.days.join(", ")}</li>
            <li>Time: {course.time.join(" - ")}</li>
            <li>Capacity: {course.capacity}</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
