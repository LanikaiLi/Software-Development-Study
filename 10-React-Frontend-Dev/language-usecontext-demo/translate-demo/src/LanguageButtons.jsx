import { useLanguage } from './LanguageContext'

function LanguageButtons() {
    const { language, setLanguage } = useLanguage()

    return (
        <div>
            <button disabled={language === 'en'} onClick={() => setLanguage('en')}>
                EN
            </button>
            <button disabled={language == 'fr'} onClick={() => setLanguage('fr')}>
                FR
            </button>
        </div>
    )
}

export default LanguageButtons