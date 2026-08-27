import { Link } from 'react-router-dom'
import { SECTIONS } from './components/sections'
import { patterns } from './content/patterns'

/**
 * Every layout this template can build, rendered through the real section
 * components.
 *
 * Deliberately not screenshots and not a hand-written copy of each layout: the
 * gallery imports the same registry `LandingPage` uses, so a change to a
 * section shows up here immediately and a pattern cannot quietly rot.
 *
 * Each entry shows the props that produce it, so building a page is a matter
 * of copying the object into a product file and replacing the copy.
 */
function PropsBlock({ props }) {
  const { type, ...rest } = props
  return (
    <details className="c-spec">
      <summary className="body-sm-semibold">
        <code>type: '{type}'</code> — show the content object
      </summary>
      <pre className="c-spec__code"><code>{format({ type, ...rest })}</code></pre>
    </details>
  )
}

/** Renders a content object the way it would be written in a product file. */
function format(value, depth = 1) {
  const pad = '  '.repeat(depth)
  const padEnd = '  '.repeat(depth - 1)
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    return `[\n${value.map((v) => pad + format(v, depth + 1)).join(',\n')}\n${padEnd}]`
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value)
    if (entries.length === 0) return '{}'
    return `{\n${entries.map(([k, v]) => `${pad}${k}: ${format(v, depth + 1)}`).join(',\n')}\n${padEnd}}`
  }
  if (typeof value === 'string') return `'${value.replace(/'/g, "\\'")}'`
  return String(value)
}

export default function PatternGallery() {
  return (
    <>
      <header className="l-band l-band--tight l-container l-stack l-stack--400">
        <p className="body-sm-semibold t-subtle">
          <Link to="/" className="c-link">Back to the pages</Link>
        </p>
        <h1 className="display-md">Pattern catalogue</h1>
        <p className="body-lg-regular l-measure">
          Every layout this template can build. Each one is rendered by the same
          component a product page uses, so what you see is what you get. Copy a
          content object into <code>src/content/products/</code>, replace the
          copy, and the page is built.
        </p>
        <nav aria-label="Patterns" className="l-row" style={{ gap: 'var(--space-400)' }}>
          {patterns.map((p) => (
            <a key={p.id} href={`#${p.id}`} className="body-sm-semibold c-link">{p.name}</a>
          ))}
        </nav>
      </header>

      {patterns.map((group) => (
        <section key={group.id} id={group.id}>
          <div className="l-band l-band--tight l-container l-stack l-stack--200 c-spec__head">
            <h2 className="display-sm">{group.name}</h2>
            <p className="body-md-regular t-subtle l-measure">{group.job}</p>
          </div>

          {group.variants.map((variant) => {
            const Component = SECTIONS[variant.props.type]
            const { type, ...props } = variant.props
            return (
              <div key={variant.label} className="c-spec__variant">
                <div className="l-band l-band--tight l-container l-stack l-stack--200">
                  <h3 className="heading-md-semibold">{variant.label}</h3>
                  {variant.note && <p className="body-sm-regular t-subtle l-measure">{variant.note}</p>}
                  <PropsBlock props={variant.props} />
                </div>
                {Component ? <Component {...props} /> : (
                  <p className="l-container body-sm-semibold" style={{ color: 'var(--text-error)' }}>
                    Unknown section type: {String(type)}
                  </p>
                )}
              </div>
            )
          })}
        </section>
      ))}
    </>
  )
}
