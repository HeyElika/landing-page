import { useSearchParams } from 'react-router-dom'
import { SECTIONS } from './components/sections'
import { patterns } from './content/patterns'
import TokenReference from './TokenReference'

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
/** A schematic of the arrangement, drawn from grey blocks. */
function Thumb({ id }) {
  const bar = (w, h = 5) => <i style={{ width: w, height: h }} />
  const block = (style) => <i style={{ alignSelf: 'stretch', flex: 1, ...style }} />
  const layouts = {
    hero: <div className="c-tb c-tb--row"><div className="c-tb__col">{bar('80%')}{bar('60%')}{bar('34px', 9)}</div>{block()}</div>,
    features: <div className="c-tb c-tb--row">{block()}{block()}{block()}</div>,
    statement: <div className="c-tb c-tb--center">{bar('70%', 6)}{bar('50%', 6)}{bar('30px', 9)}</div>,
    steps: <div className="c-tb c-tb--row">{block()}<div className="c-tb__col">{bar('90%', 4)}{bar('70%', 4)}{bar('80%', 4)}</div></div>,
    split: <div className="c-tb c-tb--col"><div className="c-tb--row" style={{ flex: 1 }}><div className="c-tb__col">{bar('90%', 4)}{bar('70%', 4)}</div>{block()}</div><div className="c-tb--row">{block({ height: 6, flex: 1, alignSelf: 'auto' })}{block({ height: 6, flex: 1, alignSelf: 'auto' })}{block({ height: 6, flex: 1, alignSelf: 'auto' })}</div></div>,
    faq: <div className="c-tb c-tb--col">{[0, 1, 2, 3].map((i) => <div key={i} className="c-tb--row">{block({ height: 5, flex: 1, alignSelf: 'auto' })}{bar('5px', 5)}</div>)}</div>,
    conversion: <div className="c-tb c-tb--row"><i style={{ width: 18, height: 18, borderRadius: 5, alignSelf: 'center' }} /><div className="c-tb__col">{bar('80%', 4)}{bar('60%', 3)}{bar('70%', 7)}</div></div>,
    supporting: <div className="c-tb c-tb--col">{[0, 1, 2].map((i) => <div key={i} className="c-tb--row">{bar('6px', 6)}{block({ height: 5, flex: 1, alignSelf: 'auto' })}</div>)}</div>,
  }
  return layouts[id] ?? <div className="c-tb" />
}

/**
 * The catalogue: a grid of sections, and one section's variants at a time.
 *
 * Variants render through the real components, so what you see is the design
 * a page gets rather than a mock of it. Each carries a version, and the URL
 * holds the selection, so "hero v2" can be sent to someone.
 */
export default function PatternGallery() {
  const [params, setParams] = useSearchParams()
  const selectedId = params.get('section')
  const selected = patterns.find((p) => p.id === selectedId)

  if (selected) {
    const version = params.get('v') || selected.variants[0].version
    const variant = selected.variants.find((v) => v.version === version) || selected.variants[0]
    const { type, ...props } = variant.props
    const Component = SECTIONS[type]

    return (
      <>
        <header className="l-band l-band--tight l-container l-stack l-stack--400">
          <p className="body-sm-semibold t-subtle">
            <button type="button" className="c-backlink" onClick={() => setParams({})}>All sections</button>
          </p>
          <h1 className="display-md">{selected.name}</h1>
          <p className="body-lg-regular l-measure">{selected.job}</p>

          {/* One version at a time. Stacking them made the page a scroll
              through five layouts when the question is which one to pick. */}
          {/* A real tab set, not the look of one: roving tabindex, arrow keys,
              and a panel that says which tab labels it. Half a pattern —
              role="tab" with no panel and no keyboard model — tells a screen
              reader user to expect behaviour that is not there. */}
          {selected.variants.length > 1 && (
            <div className="c-tabs" role="tablist" aria-label="Versions">
              {selected.variants.map((v, i) => {
                const current = v.version === variant.version
                return (
                  <button
                    key={v.version}
                    type="button"
                    role="tab"
                    id={`tab-${v.version}`}
                    aria-selected={current}
                    aria-controls="version-panel"
                    tabIndex={current ? 0 : -1}
                    className={current ? 'c-tab c-tab--on' : 'c-tab'}
                    onClick={() => setParams({ section: selected.id, v: v.version })}
                    onKeyDown={(e) => {
                      const keys = { ArrowRight: 1, ArrowLeft: -1, Home: 'first', End: 'last' }
                      const move = keys[e.key]
                      if (move === undefined) return
                      e.preventDefault()
                      const last = selected.variants.length - 1
                      const next = move === 'first' ? 0
                        : move === 'last' ? last
                        : Math.min(last, Math.max(0, i + move))
                      setParams({ section: selected.id, v: selected.variants[next].version })
                      document.getElementById(`tab-${selected.variants[next].version}`)?.focus()
                    }}
                  >
                    Version {i + 1}
                  </button>
                )
              })}
            </div>
          )}

          <p className="body-sm-regular t-subtle l-measure">{variant.note}</p>
        </header>

        <div id="version-panel" role="tabpanel" aria-labelledby={`tab-${variant.version}`} tabIndex={-1}>
          {Component ? <Component {...props} /> : null}
        </div>
      </>
    )
  }

  return (
    <div className="l-band l-container l-stack l-stack--900">
      <div className="l-stack l-stack--300">
        <h1 className="display-md">Patterns and tokens</h1>
        <p className="body-lg-regular l-measure">
          The sections a page is built from, and what they are made of. Open a section to see its
          versions rendered by the real components.
        </p>
        <nav aria-label="On this page" className="l-row" style={{ gap: 'var(--space-400)' }}>
          {[['sections', 'Sections'], ['type', 'Type'], ['colour', 'Colour'], ['icons', 'Icons'], ['buttons', 'Buttons']].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="body-sm-semibold c-link">{label}</a>
          ))}
        </nav>
      </div>

      <h2 id="sections" className="u-visually-hidden">Sections</h2>

      <ul className="l-grid l-grid--3">
        {patterns.map((group) => (
          <li key={group.id}>
            <button type="button" className="c-pcard" onClick={() => setParams({ section: group.id })}>
              <span className="c-pcard__art"><Thumb id={group.id} /></span>
              <span className="c-pcard__body">
                <span className="heading-sm-semibold">{group.name}</span>
                <span className="body-sm-regular t-subtle">{group.job}</span>
                <span className="body-xs-regular t-subtle">
                  {group.variants.length} {group.variants.length === 1 ? 'variant' : 'variants'}
                  {' · '}{group.variants.map((v) => v.version).join(', ')}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <TokenReference />
    </div>
  )
}
