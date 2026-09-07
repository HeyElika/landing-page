import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/tokens.css'
import './styles/landing.css'

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
