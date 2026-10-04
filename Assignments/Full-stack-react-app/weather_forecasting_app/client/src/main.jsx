import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { UnitProvider } from './context/UnitContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <UnitProvider>
      <App />
    </UnitProvider>
    </BrowserRouter>
  </StrictMode>,
)
