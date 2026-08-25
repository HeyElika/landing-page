import { useEffect } from 'react'
import NavBar from './components/sections/NavBar'
import Footer from './components/sections/Footer'
import { SECTIONS } from './components/sections'

/**
 * Renders a whole landing page from one content object.
 *
 * Page shape:
 *   { slug, meta, brand, nav, sections: [{ id, type, ...props }], footer }
 *
 * Sections render in array order, so reordering the page is a matter of
 * moving an object. An unknown `type` renders a visible warning in dev
 * instead of failing silently.
 */
export default function LandingPage({ page }) {
  const { meta = {}, brand = {}, nav = {}, sections = [], footer = {} } = page

  useEffect(() => {
    if (meta.title) document.title = meta.title
    const setMeta = (name, content) => {
      if (!content) return
      let el = document.querySelector(`meta[name="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }
    setMeta('description', meta.description)
  }, [meta.title, meta.description])

  return (
    <>
      <NavBar brand={brand} {...nav} />
      <main>
        {sections.map((section, i) => {
          const Component = SECTIONS[section.type]
          const { type, id, ...props } = section
          if (!Component) {
            return (
              <div key={`${type}-${i}`} className="l-band l-container">
                <p className="body-sm-semibold" style={{ color: 'var(--text-error)' }}>
                  Unknown section type: {String(type)}
                </p>
              </div>
            )
          }
          return (
            <div key={id || `${type}-${i}`} id={id}>
              <Component {...props} />
            </div>
          )
        })}
      </main>
      <Footer brand={brand} {...footer} />
    </>
  )
}
