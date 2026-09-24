import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext(null) // this is how we can create the context

export function LanguageProvider({ children }) { // this is how we can provide the context to the component
    const [language, setLanguage] = useState("en")

    return (
        <LanguageContext value={{ language, setLanguage }}>
            {children}
        </LanguageContext>
    )
}

export function useLanguage() { // this is how we can access the context in the component
    return useContext(LanguageContext)
}