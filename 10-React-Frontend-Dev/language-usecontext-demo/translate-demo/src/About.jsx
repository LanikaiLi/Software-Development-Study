import { useLanguage } from './LanguageContext'

const blurbs = {
    en: {
        title: "About this Site",
        body: "This is a small demo website built to demonstate Context in React. Have a great day!"
    },
    fr: {
        title: "À propos de ce site",
        body: "C'est un petit site web de démonstration créé pour illustrer Context dans React. Bonne journée !"
    }
}

function About() {
    const { language } = useLanguage()
    const blurb = blurbs[language]

    return (
        <main>
            <h1>{blurb.title}</h1>
            <p>{blurb.body}</p>
        </main>
    )
}

export default About