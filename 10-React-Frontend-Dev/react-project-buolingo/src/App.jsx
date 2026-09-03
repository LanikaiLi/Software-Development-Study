import { useState, useEffect } from 'react'
import './App.css'
import CourseDetail from './CourseDetail'

function App() {
  const [courses, setCourses] = useState([])
  const [languages, setLanguages] = useState([])

  useEffect(() => {
    fetch('https://j-goodman.github.io/language-class-data/data/class-list.json').then(response => response.json()).then(data => setCourses(data))
  }, [])

  useEffect (() => {
    fetch("https://j-goodman.github.io/language-class-data/data/languages.json").then(response => response.json()).then(data => setLanguages(data.languages))
  }, [])

  const course = courses[0]
  const language = languages.find(lang => lang.language === course?.language)

  return (
    <div>
      {course && (
        <CourseDetail course={course} language={language}/>
      )}
    </div>
  )
}

export default App
