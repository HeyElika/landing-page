import { Routes, Route, useParams, Link } from 'react-router-dom'
import LandingPage from './LandingPage'
import Cta from './components/ui/Cta'
import { pages, defaultPage, getPage } from './content'

function ProductRoute() {
  const { slug } = useParams()
  const page = getPage(slug)
  if (!page) return <NotFound />
  return <LandingPage page={page} />
}

/** Shown when a slug does not match any product file. */
function NotFound() {
  return (
    <div className="l-band l-band--lg l-container l-container--narrow l-stack l-stack--400 t-center">
      <p className="label-xs t-brand">404</p>
      <h1 className="heading-lg-bold">We could not find that page</h1>
      <p className="body-md-regular t-subtle">The link may be out of date. Head back to the main page to keep going.</p>
      <p><Cta label="Back to home" href="/" /></p>
    </div>
  )
}

/** Internal index of every page in this project. Handy for review links. */
function PageIndex() {
  return (
    <div className="l-band l-container l-container--narrow l-stack l-stack--600">
      <h1 className="heading-lg-bold">Pages in this project</h1>
      <ul className="l-stack l-stack--300">
        {pages.map((p) => (
          <li key={p.slug} className="c-card l-stack l-stack--100">
            <Link to={`/${p.slug}`} className="heading-sm-semibold c-link">{p.name}</Link>
            <span className="body-sm-regular t-subtle">/{p.slug}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage page={defaultPage} />} />
      <Route path="/_pages" element={<PageIndex />} />
      <Route path="/:slug" element={<ProductRoute />} />
    </Routes>
  )
}
