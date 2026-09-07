import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/tokens.css'
import './styles/landing.css'
import { setConsent, hasConsent } from './lib/track'

// The consent switch a cookie banner calls. Kept on window rather than wired
// to a banner here, because which banner this page uses is not this template's
// decision — but nothing is measured until something calls it.
window.billease = { ...(window.billease || {}), setConsent, hasConsent }

const container = document.getElementById('root')

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// The build prerenders each page into #root. Hydrating attaches to that markup
// instead of throwing it away and painting again, so the text a reader is
// already looking at does not flicker.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
