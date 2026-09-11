import { tokenData } from './content/tokens.generated'
import { ICONS } from './assets/icons/icons.generated'

/**
 * The token half of the catalogue: what the sections above are made of.
 *
 * Data comes from `tokens.generated.js`, extracted from the stylesheets and
 * the DS Button by `npm run tokens`, and scoped to what the live page paints.
 * Rendering it here rather than in a separate static page means the catalogue
 * and the reference are one document — two pages describing one system drift.
 */
function Table({ head, rows }) {
  return (
    <div className="c-doc__scroll">
      <table className="c-doc__table">
        <thead><tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((cells, i) => <tr key={i}>{cells.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

const Swatch = ({ hex }) => <span className="c-doc__chip" style={{ background: hex }} />

export default function TokenReference() {
  const { scale, displaySteps, fixed, semantic, primitives, icons, iconSizes, buttons } = tokenData
  const tiers = displaySteps[0].perTier.map((t) => t.tier)

  return (
    <div className="l-stack l-stack--900">
      <section id="type" className="l-stack l-stack--400">
        <h2 className="display-sm">Type</h2>
        <p className="body-md-regular t-subtle l-measure">
          T-shirt sizes, every value a whole pixel. Only the steps this page paints are listed.
        </p>

        <Table
          head={['Token', 'Value', 'Notes']}
          rows={[[
            <code key="t">--ds-font-family</code>,
            <span key="v" style={{ fontWeight: 600 }}>Geist</span>,
            <span key="n" className="t-subtle">
              Self-hosted variable file, weight axis 100&ndash;900, 29&nbsp;kB. From Google Fonts, served
              from this origin rather than linked. Falls back to Source Sans Pro, the design system
              face. SIL Open Font License 1.1.
            </span>,
          ]]}
        />

        <Table
          head={['Token', 'Value', 'Source', 'Specimen']}
          rows={scale.map((s) => [
            <code key="t">{s.name}</code>,
            <span key="v" className="c-doc__num">{s.px}</span>,
            <span key="s" className="t-subtle">{s.from.startsWith('var(') ? 'library' : 'landing layer'}</span>,
            <span key="p" style={{ fontSize: s.px, fontWeight: 600, lineHeight: 1 }}>Aa</span>,
          ])}
        />

        <h3 className="heading-sm-semibold">Display steps</h3>
        <Table
          head={['Style', ...tiers, 'Weight', 'Used for']}
          rows={displaySteps.map((d) => [
            <code key="c">.{d.cls}</code>,
            ...d.perTier.map((t, i) => <span key={i} className="c-doc__num">{t.px ?? '—'}</span>),
            <span key="w" className="c-doc__num">{d.weight}</span>,
            <span key="u" className="t-subtle">{d.purpose}</span>,
          ])}
        />

        <h3 className="heading-sm-semibold">Fixed styles</h3>
        <Table
          head={['Class', 'Size', 'Scale', 'Weight', 'Uses', 'Specimen']}
          rows={fixed.map((f) => [
            <code key="c">.{f.name}</code>,
            <span key="s" className="c-doc__num">{f.px}</span>,
            <span key="t" className="t-subtle">{f.tshirt?.replace('--font-size-', '') ?? ''}</span>,
            <span key="w" className="c-doc__num">{f.weight}</span>,
            <span key="u" className="c-doc__num t-subtle">{f.uses}</span>,
            <span key="p" style={{ fontSize: f.px, fontWeight: f.weight, lineHeight: 1.2 }}>Activate your card</span>,
          ])}
        />
      </section>

      <section id="colour" className="l-stack l-stack--400">
        <h2 className="display-sm">Colour</h2>
        <p className="body-md-regular t-subtle l-measure">
          Components reference the semantic token; the primitive behind it is the design decision.
        </p>
        {semantic.map((group) => (
          <div key={group.label} className="l-stack l-stack--200">
            <h3 className="heading-sm-semibold">{group.label}</h3>
            <Table
              head={['', 'Semantic', 'Primitive', 'Value']}
              rows={group.items.map((i) => [
                <Swatch key="s" hex={i.hex} />,
                <code key="n">{i.name}</code>,
                <span key="p" className="t-subtle"><code>{i.primitive ?? ''}</code></span>,
                <span key="h" className="c-doc__num t-subtle">{i.hex}</span>,
              ])}
            />
          </div>
        ))}
        <h3 className="heading-sm-semibold">Primitives</h3>
        <Table
          head={['', 'Primitive', 'Value', 'Reached through']}
          rows={primitives.map((p) => [
            <Swatch key="s" hex={p.hex} />,
            <code key="n">{p.name}</code>,
            <span key="h" className="c-doc__num t-subtle">{p.hex}</span>,
            <span key="v" className="t-subtle"><code>{p.via.join(', ') || 'used directly'}</code></span>,
          ])}
        />
      </section>

      <section id="icons" className="l-stack l-stack--400">
        <h2 className="display-sm">Icons</h2>
        <p className="body-md-regular t-subtle l-measure">
          <a className="c-link link-md" href="https://www.streamlinehq.com/icons/solar" target="_blank" rel="noreferrer">Solar Linear</a>{' '}
          from Streamline, generated from <code>@iconify-json/solar</code> rather than pasted in, so every icon keeps one stroke weight.
        </p>
        <Table
          head={['Token', 'Scale', 'Size', 'Sample']}
          rows={iconSizes.map((s) => [
            <code key="t">{s.name}</code>,
            <span key="k" className="t-subtle">{s.tshirt}</span>,
            <span key="v" className="c-doc__num">{s.px}</span>,
            <span key="p" className="c-doc__samples">
              {['chevron-down', 'lock', 'incognito', 'document'].filter((n) => ICONS[n]).map((n) => (
                <svg key={n} viewBox={ICONS[n].viewBox} fill="none" style={{ width: s.px, height: s.px }}
                  dangerouslySetInnerHTML={{ __html: ICONS[n].body }} />
              ))}
            </span>,
          ])}
        />
        <ul className="c-doc__icons">
          {icons.filter((n) => ICONS[n]).map((n) => (
            <li key={n} className="c-doc__icon">
              <svg viewBox={ICONS[n].viewBox} fill="none" aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: ICONS[n].body }} />
              <code>{n}</code>
            </li>
          ))}
        </ul>
      </section>

      <section id="buttons" className="l-stack l-stack--400">
        <h2 className="display-sm">Buttons</h2>
        <p className="body-md-regular t-subtle l-measure">
          Hover and press the examples: they carry the overlays the page carries.
        </p>
        <Table
          head={['Variant', 'Default', 'Hover', 'Pressed', 'Disabled']}
          rows={buttons.variants.map((v) => {
            const ghost = v.key === 'ghost'
            const chip = (bg, text, extra = {}) => (
              <span style={{
                display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap',
                height: `${buttons.heights.lg}px`, paddingInline: ghost ? 0 : `${buttons.padding.lg}px`,
                borderRadius: ghost ? 0 : 'var(--radius-full)', background: bg, color: text,
                fontSize: 'var(--font-size-sm)', fontWeight: 600,
                textDecoration: ghost ? 'underline' : 'none', ...extra,
              }}>Open app</span>
            )
            const over = (o) => `linear-gradient(${o}, ${o}), ${v.bg}`
            return [
              <span key="l" className="t-subtle"><code>{v.label}</code></span>,
              chip(v.bg, v.text),
              chip(over(buttons.overlay.hover), v.text),
              chip(over(buttons.overlay.pressed), v.text),
              chip(v.disabledBg, v.disabledText),
            ]
          })}
        />
        <h3 className="heading-sm-semibold">Sizes</h3>
        <Table
          head={['Scale', 'Height', 'Padding', 'Example']}
          rows={['xl', 'lg', 'md', 'sm'].filter((k) => buttons.heights[k]).map((k) => [
            <code key="k">{k}</code>,
            <span key="h" className="c-doc__num">{buttons.heights[k]}px</span>,
            <span key="p" className="c-doc__num t-subtle">{buttons.padding[k]}px</span>,
            <button key="b" type="button" className="c-doc__btn" style={{
              height: `${buttons.heights[k]}px`, paddingInline: `${buttons.padding[k]}px`,
              fontSize: k === 'sm' ? 'var(--font-size-sm)' : 'var(--font-size-md)',
            }}>Open app</button>,
          ])}
        />
      </section>
    </div>
  )
}
