import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './assets/style.css'
import './assets/cards.css'
import './assets/responsive.css'
import './assets/navbar.css'
import './assets/excursion-single.css'
import App from './App.jsx'
import './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
