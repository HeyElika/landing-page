/**
 * Builds the visual token reference.
 *
 * Reads the generated token file, the generated icon file and the landing
 * layer's layout constants, and writes a standalone HTML page showing every
 * value as itself: colours as swatches, spacing as bars, type as specimens,
 * icons as icons.
 *
 * Generated rather than written by hand for the same reason the tokens are:
 * a reference someone has to remember to update is a reference that lies.
 * Run `npm run tokens:page` after changing tokens.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => readFileSync(join(root, p), 'utf8')

const tokensCss = read('src/styles/tokens.css')
const landingCss = read('src/styles/landing.css')
const iconsJs = read('src/assets/icons/icons.generated.js')
const fontData = readFileSync(join(root, 'public/fonts/OverusedGrotesk-VF.woff2')).toString('base64')

/* ── Parse ──────────────────────────────────────────────────────────────── */

/** Every custom property declared at :root, in source order. */
function customProps(css) {
  const out = new Map()
  for (const m of css.matchAll(/^\s{2}(--[a-z0-9-]+):\s*([^;]+);/gim)) out.set(m[1], m[2].trim())
  return out
}

const tokens = customProps(tokensCss)
const layout = customProps(landingCss.slice(landingCss.indexOf(':root {'), landingCss.indexOf('\n}')))

/** Follow var() references to the literal underneath. */
function resolve(value, depth = 0) {
  const m = value?.match(/^var\((--[a-z0-9-]+)\)$/)
  if (!m || depth > 6) return value
  return resolve(tokens.get(m[1]), depth + 1)
}

const group = (prefix, exclude = []) =>
  [...tokens.entries()]
    .filter(([k]) => k.startsWith(prefix) && !exclude.some((e) => k.startsWith(e)))
    .map(([k, v]) => ({ name: k, raw: v, value: resolve(v) }))

/** Type style classes, with the declarations that define them. */
const typeStyles = [...tokensCss.matchAll(/^\.([a-z0-9-]+)\s*\{([^}]+)\}/gim)]
  .map(([, name, body]) => {
    const get = (p) => (body.match(new RegExp(`${p}:\\s*([^;]+);`)) || [])[1]
    return { name, size: get('font-size'), weight: get('font-weight'), lh: get('line-height') }
  })
  .filter((t) => t.size)

/** Display scale from the landing layer, which the token file does not carry. */
const display = [...landingCss.matchAll(/^\s{2}(--display-[a-z]+):\s*(clamp\([^;]+\));/gim)]
  .map(([, name, value]) => ({ name, value }))

const icons = [...iconsJs.matchAll(/'([a-z0-9-]+)':\s*\{"solar":"([^"]+)","body":"([\s\S]*?)","viewBox":"([^"]+)"\}/g)]
  .map(([, name, solar, body, viewBox]) => ({ name, solar, body: body.replace(/\\"/g, '"'), viewBox }))

const breakpoints = [...new Set(
  [...landingCss.matchAll(/@media \(min-width: (\d+)px\)/g)].map((m) => Number(m[1])),
)].sort((a, b) => a - b)

/* ── Render ─────────────────────────────────────────────────────────────── */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')

const swatches = (items) => items.map((t) => `
      <li class="swatch">
        <span class="chip" style="background: ${t.value}"></span>
        <span class="swatch__body">
          <code>${t.name}</code>
          <span class="muted mono">${esc(t.raw === t.value ? t.value : `${t.raw} → ${t.value}`)}</span>
        </span>
      </li>`).join('')

const scaleBars = (items, prop) => items.map((t) => `
      <li class="bar">
        <code>${t.name}</code>
        <span class="bar__viz"><span style="${prop}: ${t.value}"></span></span>
        <span class="mono muted">${t.value}</span>
      </li>`).join('')

const html = `<title>Billease token reference</title>
<style>
  @font-face {
    font-family: 'Overused Grotesk';
    src: url(data:font/woff2;base64,${fontData}) format('woff2-variations');
    font-weight: 300 900;
    font-display: swap;
  }

  /* Light only, deliberately: a token reference is judged against the ground
     the product actually ships on, and every swatch below is a light-surface
     value. A dark rendering would misrepresent them. */
  :root {
${[...tokens].map(([k, v]) => `    ${k}: ${v};`).join('\n')}
${[...layout].map(([k, v]) => `    ${k}: ${v};`).join('\n')}
    --ink: #16191D;
    --ink-soft: #5C6672;
    --ink-faint: #949DA6;
    --ground: #FFFFFF;
    --panel: #F7F8F9;
    --hairline: #E4E7EA;
    --mono: ui-monospace, SFMono-Regular, Menlo, monospace;
    --doc: 'Overused Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  body { margin: 0; background: var(--ground); color: var(--ink); font-family: var(--doc); font-size: 16px; line-height: 1.55; -webkit-font-smoothing: antialiased; }
  .wrap { max-width: 1120px; margin: 0 auto; padding: 56px 24px 96px; display: flex; flex-direction: column; gap: 56px; }
  h1, h2, h3 { margin: 0; text-wrap: balance; }
  h1 { font-size: clamp(32px, 4.6vw, 48px); font-weight: 700; letter-spacing: -0.02em; line-height: 1.08; }
  h2 { font-size: 24px; font-weight: 700; letter-spacing: -0.01em; }
  h3 { font-size: 15px; font-weight: 600; color: var(--ink-soft); }
  p { margin: 0; max-width: 70ch; }
  .lede { font-size: 19px; color: var(--ink-soft); }
  .muted { color: var(--ink-soft); }
  .mono, code { font-family: var(--mono); font-size: 13px; }
  code { color: var(--ink); }
  section { display: flex; flex-direction: column; gap: 16px; }
  .sub { display: flex; flex-direction: column; gap: 10px; }
  ul { list-style: none; margin: 0; padding: 0; }
  .note { font-size: 14px; color: var(--ink-soft); padding: 12px 16px; background: var(--panel); border-radius: 10px; border: 1px solid var(--hairline); }

  .grid { display: grid; gap: 8px; grid-template-columns: 1fr; }
  @media (min-width: 620px) { .grid { grid-template-columns: 1fr 1fr; } }
  @media (min-width: 960px) { .grid { grid-template-columns: 1fr 1fr 1fr; } }

  .swatch { display: flex; align-items: center; gap: 12px; padding: 6px; border-radius: 10px; }
  .chip { width: 40px; height: 40px; border-radius: 8px; border: 1px solid var(--hairline); flex: none; }
  .swatch__body { display: flex; flex-direction: column; line-height: 1.35; min-width: 0; }
  .swatch__body .mono { font-size: 11px; }

  .bar { display: grid; grid-template-columns: 140px 1fr 60px; gap: 12px; align-items: center; padding: 4px 0; }
  .bar__viz span { display: block; height: 18px; background: var(--bg-primary); border-radius: 3px; }
  .radii { display: flex; flex-wrap: wrap; gap: 16px; }
  .radii div { text-align: center; display: grid; gap: 6px; justify-items: center; }
  .radii i { display: block; width: 72px; height: 56px; background: var(--bg-sunken); border: 1px solid var(--hairline); }

  .type { display: grid; grid-template-columns: 1fr; gap: 4px; padding: 14px 0; border-bottom: 1px solid var(--hairline); }
  @media (min-width: 760px) { .type { grid-template-columns: 1fr 200px; align-items: baseline; } }
  .type__meta { font-family: var(--mono); font-size: 12px; color: var(--ink-faint); }

  .icons { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 10px; }
  .icon { display: grid; justify-items: center; gap: 8px; padding: 14px 6px; border: 1px solid var(--hairline); border-radius: 10px; text-align: center; }
  .icon svg { width: 24px; height: 24px; color: var(--icon-base); }
  .icon code { font-size: 11px; word-break: break-word; }

  table { width: 100%; border-collapse: collapse; font-size: 15px; }
  th, td { text-align: left; padding: 10px 16px 10px 0; border-bottom: 1px solid var(--hairline); vertical-align: top; }
  th { font-family: var(--mono); font-size: 11px; letter-spacing: .07em; text-transform: uppercase; color: var(--ink-faint); font-weight: 500; }
  td.n { font-family: var(--mono); }

  .ruler { display: grid; gap: 6px; }
  .ruler div { display: grid; grid-template-columns: 130px 1fr; gap: 12px; align-items: center; font-family: var(--mono); font-size: 12px; }
  .ruler i { display: block; height: 14px; background: var(--bg-secondary); border-radius: 3px; opacity: .85; }
</style>

<div class="wrap">

  <header style="display:flex;flex-direction:column;gap:12px">
    <p class="mono muted">Billease · landing page template</p>
    <h1>Token reference</h1>
    <p class="lede">Every value the template can use, shown as itself. Generated from <code>tokens.css</code>, <code>landing.css</code> and the icon set, so it cannot drift from the code.</p>
    <p class="note"><strong>${tokens.size}</strong> design tokens · <strong>${typeStyles.length}</strong> type styles · <strong>${icons.length}</strong> icons · <strong>${breakpoints.length}</strong> breakpoints</p>
  </header>

  <section>
    <h2>Typography</h2>
    <div class="sub">
      <h3>Display scale — landing layer, fluid</h3>
      <p class="muted" style="font-size:14px">Resize this page and these change; the rest of the scale does not.</p>
      ${display.map((d) => `
      <div class="type">
        <span style="font-size: ${d.value}; font-weight: 700; line-height: 1.1; letter-spacing: -0.02em">Activate your card</span>
        <span class="type__meta">${d.name}<br>${esc(d.value)}</span>
      </div>`).join('')}
    </div>

    <div class="sub">
      <h3>Type styles — use these, never a raw font-size</h3>
      ${typeStyles.map((t) => `
      <div class="type">
        <span style="font-size: ${t.size}; font-weight: ${t.weight}; line-height: ${t.lh}">Your Billease limit, now on a card</span>
        <span class="type__meta">.${t.name}<br>${t.size} · ${t.weight}</span>
      </div>`).join('')}
    </div>

    <div class="sub">
      <h3>Size and weight tokens</h3>
      <ul class="grid">${group('--text-').map((t) => `
        <li class="swatch"><span class="swatch__body"><code>${t.name}</code><span class="mono muted">${t.value}</span></span></li>`).join('')}
      ${group('--font-weight-').map((t) => `
        <li class="swatch"><span class="swatch__body"><code>${t.name}</code><span class="mono muted">${t.value}</span></span></li>`).join('')}
      </ul>
    </div>
  </section>

  <section>
    <h2>Spacing</h2>
    <ul>${scaleBars(group('--space-'), 'width')}</ul>
    <p class="note">Compose larger values from tokens — <code>calc(var(--space-1000) + var(--space-400))</code>, never <code>64px</code>. Use <code>.l-stack--*</code> and <code>.l-row</code> gaps rather than per-element margins.</p>
  </section>

  <section>
    <h2>Radius</h2>
    <div class="radii">${group('--radius-').map((t) => `
      <div><i style="border-radius: ${t.value}"></i><code>${t.name}</code><span class="mono muted">${t.value}</span></div>`).join('')}
    </div>
    <p class="note"><strong>Every image and container uses <code>--radius-2xl</code>.</strong> <code>--radius-full</code> is for pills and circular markers, <code>--radius-md</code> for small controls.</p>
  </section>

  <section>
    <h2>Colour — semantic</h2>
    <p class="muted" style="font-size:14px">Use these. Reach for a primitive only when no semantic token exists.</p>
    ${[['Background', '--bg-'], ['Text', '--text-base'], ['Border', '--border-'], ['Icon', '--icon-'], ['Canvas', '--canvas-']]
      .map(([label, prefix]) => {
        const items = prefix === '--text-base'
          ? group('--text-').filter((t) => !/^--text-(xs|sm|md|lg|xl|2xl|3xl)$/.test(t.name))
          : group(prefix, prefix === '--border-' ? ['--border-width'] : [])
        if (!items.length) return ''
        return `<div class="sub"><h3>${label}</h3><ul class="grid">${swatches(items)}</ul></div>`
      }).join('')}
  </section>

  <section>
    <h2>Colour — primitives</h2>
    ${['neutral', 'red', 'blue', 'green', 'yellow', 'magenta', 'success', 'error', 'warning', 'info']
      .map((family) => {
        const items = group(`--color-${family}-`)
        return items.length ? `<div class="sub"><h3>${family}</h3><ul class="grid">${swatches(items)}</ul></div>` : ''
      }).join('')}
    <div class="sub"><h3>Alpha</h3><ul class="grid">${swatches([...group('--alpha-black-'), ...group('--alpha-white-')])}</ul></div>
  </section>

  <section>
    <h2>Icons — ${icons.length}, all Solar Linear</h2>
    <div class="icons">${icons.map((i) => `
      <div class="icon">
        <svg viewBox="${i.viewBox}" fill="none" aria-hidden="true">${i.body}</svg>
        <code>${i.name}</code>
      </div>`).join('')}
    </div>
    <p class="note">Add one by mapping it in <code>scripts/build-icons.mjs</code> and running <code>npm run icons</code>. Never paste path data.</p>
  </section>

  <section>
    <h2>Icon sizes</h2>
    <ul>${scaleBars(group('--icon-size-'), 'width')}</ul>
  </section>

  <section>
    <h2>Border widths</h2>
    <ul>${scaleBars(group('--border-width-'), 'height')}</ul>
  </section>

  <section>
    <h2>Layout constants</h2>
    <div class="ruler">
      ${['--page-max', '--column-list', '--column-narrow', '--column-reading']
        .filter((k) => layout.has(k))
        .map((k) => `<div><span>${k}</span><i style="width: min(100%, ${layout.get(k)})"></i></div>`).join('')}
    </div>
    <table>
      <thead><tr><th>Token</th><th>Value</th><th>Governs</th></tr></thead>
      <tbody>
        ${[['--page-max', 'The content column every section shares'],
           ['--page-gutter', 'Page margin: 20 on phones, 32 from 768px'],
           ['--nav-h', 'Sticky header height'],
           ['--measure', 'Maximum line length for prose'],
           ['--column-reading', 'Prose-only sections'],
           ['--column-narrow', 'Narrow content sections'],
           ['--column-list', 'A list of controls, e.g. the FAQ'],
           ['--band-y-tight', 'Section padding: footer, download panel'],
           ['--band-y', 'Section padding: standard'],
           ['--band-y-lg', 'Section padding: hero and emphasis']]
          .filter(([k]) => layout.has(k))
          .map(([k, what]) => `<tr><td class="n">${k}</td><td class="n">${esc(layout.get(k))}</td><td class="muted">${what}</td></tr>`).join('')}
      </tbody>
    </table>
    <p class="note">The gutter sits on the band, <strong>outside</strong> <code>.l-container</code>. Padding inside the container offsets that section by one gutter above 1264px — <code>check-layout.mjs</code> fails the build on it.</p>
  </section>

  <section>
    <h2>Breakpoints — the one thing not centralised</h2>
    <p class="muted" style="font-size:14px">CSS custom properties do not work inside media queries, so these are literals.</p>
    <table>
      <thead><tr><th>Width</th><th>What changes</th></tr></thead>
      <tbody>
        ${[[640, 'Two-column grids appear'],
           [768, 'Gutter 20 → 32, band rhythm steps up'],
           [900, 'The main one. Split layouts go side by side, viewport-fitted sections activate, the card row stops being a carousel'],
           [960, 'Three and four column grids appear'],
           [1024, 'Band rhythm steps up again'],
           [1200, 'Wider gaps between split columns']]
          .filter(([w]) => breakpoints.includes(w))
          .map(([w, what]) => `<tr><td class="n">${w}px</td><td class="muted">${what}</td></tr>`).join('')}
      </tbody>
    </table>
    <p class="note"><strong>Known wart.</strong> 900 and 960 do nearly the same job, and 640 and 768 overlap. A future page should collapse these to four rather than adding a seventh.</p>
  </section>

</div>
`

const out = process.argv[2] || 'token-reference.html'
writeFileSync(out, html)
console.log(`token reference written: ${out}`)
console.log(`  ${tokens.size} tokens · ${typeStyles.length} type styles · ${display.length} display steps · ${icons.length} icons · ${breakpoints.length} breakpoints`)
