import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

const saved = (() => {
    try { return localStorage.getItem('site-language'); } catch { return null; }
})();

const browserLang = navigator.language.split('-')[0];
const supportedLangs = ['en', 'fr', 'de', 'es'];
const detectedLang = supportedLangs.includes(browserLang) ? browserLang : 'en';

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: saved || detectedLang,
        fallbackLng: 'en',
        ns: ['common'],
        defaultNS: 'common',
        interpolation: { escapeValue: false },
        returnEmptyString: false,
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            lookupLocalStorage: 'site-language',
            caches: ['localStorage'],
        },
        backend: {
            loadPath: '/locales/{{lng}}/common.json',
        },
    });

export default i18n;
