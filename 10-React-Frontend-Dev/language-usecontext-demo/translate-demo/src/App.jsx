import { LanguageProvider } from './LanguageContext'
import LanguageButtons from './LanguageButtons'
import About from './About'
import './App.css'

function App() {
  return (
    <LanguageProvider>
      <LanguageButtons />
      <About />
    </LanguageProvider>
  )
}

export default App
