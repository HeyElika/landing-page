/**
 * Builds the visual token reference for THIS project.
 *
 * Two things only: the colours these pages use, as primitive → semantic pairs,
 * and the typography they use, mapped onto the t-shirt scale. Not the whole
 * design system export — the library carries 223 tokens and a landing page
 * touches a third of them, so a reference showing everything hides the palette
 * the pages actually share.
 *
 * Generated from tokens.css and landing.css, so it cannot drift. Everything
 * else — spacing, radius, icons, layout, breakpoints — is in TOKENS.md.
 *
 * Run: npm run tokens:page
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => readFileSync(join(root, p), 'utf8')

const tokensCss = read('src/styles/tokens.css')
const landingCss = read('src/styles/landing.css')
const fontData = readFileSync(join(root, 'public/fonts/OverusedGrotesk-VF.woff2')).toString('base64')

/* ── Parse ──────────────────────────────────────────────────────────────── */

const props = (css) => {
  const out = new Map()
  for (const m of css.matchAll(/^\s{2,4}(--[a-z0-9-]+):\s*([^;]+);/gm)) if (!out.has(m[1])) out.set(m[1], m[2].trim())
  return out
}
const tokens = props(tokensCss)
const landing = props(landingCss)
const all = new Map([...tokens, ...landing])

const resolve = (v, d = 0) => {
  const m = v?.match(/^var\((--[a-z0-9-]+)\)$/)
  return !m || d > 6 ? v : resolve(all.get(m[1]), d + 1)
}
/** The primitive a semantic token points at, if it points at one. */
const backing = (v) => (v?.match(/^var\((--[a-z0-9-]+)\)$/) || [])[1]

/* ── Usage ──────────────────────────────────────────────────────────────── */

const sources = [
  read('src/styles/landing.css'), read('src/App.jsx'), read('src/LandingPage.jsx'), read('src/PatternGallery.jsx'),
  ...['sections', 'ui', 'ds'].flatMap((d) =>
    readdirSync(join(root, 'src/components', d)).filter((f) => f.endsWith('.jsx'))
      .map((f) => readFileSync(join(root, 'src/components', d, f), 'utf8'))),
  ...readdirSync(join(root, 'src/content/products')).filter((f) => f.endsWith('.js'))
    .map((f) => readFileSync(join(root, 'src/content/products', f), 'utf8')),
  read('src/content/brand.js'), read('src/content/patterns.js'),
].join('\n')

const referenced = new Set([...sources.matchAll(/var\((--[a-z0-9-]+)/g)].map((m) => m[1]))
for (const name of [...referenced]) {
  let v = all.get(name)
  for (let i = 0; i < 6 && v; i++) {
    const b = backing(v)
    if (!b) break
    referenced.add(b)
    v = all.get(b)
  }
}

/* ── Colour ─────────────────────────────────────────────────────────────── */

const COLOUR_GROUPS = [
  ['Background', (k) => k.startsWith('--bg-') || k.startsWith('--canvas-')],
  ['Text', (k) => k.startsWith('--text-') && !/^--text-(xs|sm|md|lg|xl|2xl|3xl)$/.test(k)],
  ['Border', (k) => k.startsWith('--border-') && !k.startsWith('--border-width')],
  ['Icon', (k) => k.startsWith('--icon-') && !k.startsWith('--icon-size')],
  ['Transparency', (k) => k.startsWith('--alpha-')],
]
const semantic = COLOUR_GROUPS.map(([label, test]) => [
  label,
  [...tokens.keys()].filter((k) => test(k) && referenced.has(k)).map((k) => ({
    name: k, primitive: backing(tokens.get(k)), hex: resolve(tokens.get(k)),
  })),
]).filter(([, items]) => items.length)

/** Primitives reached through a semantic token, or used directly. */
const primitives = [...tokens.keys()]
  .filter((k) => k.startsWith('--color-') && referenced.has(k))
  .map((k) => {
    const usedVia = semantic.flatMap(([, items]) => items).filter((s) => s.primitive === k).map((s) => s.name)
    return { name: k, hex: resolve(tokens.get(k)), usedVia, direct: new RegExp(`var\\(${k}\\)`).test(sources) }
  })

/* ── Typography ─────────────────────────────────────────────────────────── */

const scale = [...landing.keys()].filter((k) => k.startsWith('--font-size-'))
  .map((k) => ({ name: k, px: resolve(landing.get(k)), from: landing.get(k) }))
const byPx = Object.fromEntries(scale.map((s) => [s.px, s.name]))

const styles = []
for (const css of [tokensCss, landingCss]) {
  for (const m of css.matchAll(/^\.((?:body|heading|link|display)-[a-z0-9-]+)\s*\{([^}]+)\}/gm)) {
    const [, name, body] = m
    const g = (p) => (body.match(new RegExp(`${p}:\\s*([^;]+);`)) || [])[1]?.trim()
    const uses = (sources.match(new RegExp(`["'\\s]${name}["'\\s]`, 'g')) || []).length
    if (!uses || styles.some((s) => s.name === name)) continue
    const size = g('font-size')
    styles.push({
      name, uses,
      size, px: resolve(size),
      tshirt: byPx[resolve(size)],
      weight: resolve(g('font-weight')),
      lh: g('line-height'),
      fluid: size?.startsWith('var(--display-'),
    })
  }
}
const fixed = styles.filter((s) => !s.fluid).sort((a, b) => parseInt(b.px) - parseInt(a.px))
const responsive = styles.filter((s) => s.fluid)

/** Display steps at each tier. */
const tier = (label, css) => {
  const out = {}
  for (const m of css.matchAll(/(--display-[a-z]+):\s*var\((--font-size-[a-z0-9]+)\)/g)) out[m[1]] = m[2]
  return { label, steps: out }
}
const base = landingCss.slice(0, landingCss.indexOf('@media'))
const block = (w) => {
  const i = landingCss.indexOf(`@media (min-width: ${w}px) {\n  :root {`)
  return i < 0 ? '' : landingCss.slice(i, landingCss.indexOf('\n}', i))
}
const tiers = [tier('Phone', base), tier('Tablet 768+', block(768)), tier('Desktop 1200+', block(1200))]

/* ── Render ─────────────────────────────────────────────────────────────── */

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
const px = (v) => parseInt(v)

const html = `<title>Billease colour and type</title>
<style>
  @font-face {
    font-family: 'Overused Grotesk';
    src: url(data:font/woff2;base64,${fontData}) format('woff2-variations');
    font-weight: 300 900;
    font-display: swap;
  }
  /* Light only, deliberately: every swatch below is a light-surface value, and
     rendering them on a dark ground would misrepresent them. */
  :root {
${[...all].map(([k, v]) => `    ${k}: ${v};`).join('\n')}
    --ink: #16191D; --ink-soft: #5C6672; --ink-faint: #949DA6;
    --ground: #FFFFFF; --panel: #F7F8F9; --hairline: #E4E7EA;
    --mono: ui-monospace, SFMono-Regular, Menlo, monospace;
    --doc: 'Overused Grotesk', -apple-system, sans-serif;
  }
  body { margin: 0; background: var(--ground); color: var(--ink); font-family: var(--doc); font-size: 16px; line-height: 1.55; -webkit-font-smoothing: antialiased; }
  .wrap { max-width: 1080px; margin: 0 auto; padding: 56px 24px 96px; display: flex; flex-direction: column; gap: 56px; }
  h1, h2, h3 { margin: 0; text-wrap: balance; }
  h1 { font-size: 48px; font-weight: 700; letter-spacing: -.02em; line-height: 1.08; }
  h2 { font-size: 24px; font-weight: 700; letter-spacing: -.01em; }
  h3 { font-size: 14px; font-weight: 600; color: var(--ink-soft); text-transform: uppercase; letter-spacing: .06em; }
  p { margin: 0; max-width: 70ch; }
  .lede { font-size: 19px; color: var(--ink-soft); }
  .muted { color: var(--ink-soft); }
  .mono, code { font-family: var(--mono); font-size: 12.5px; }
  section { display: flex; flex-direction: column; gap: 18px; }
  .sub { display: flex; flex-direction: column; gap: 10px; }
  .note { font-size: 14px; color: var(--ink-soft); padding: 12px 16px; background: var(--panel); border-radius: 10px; border: 1px solid var(--hairline); }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th, td { text-align: left; padding: 9px 14px 9px 0; border-bottom: 1px solid var(--hairline); vertical-align: middle; }
  th { font-family: var(--mono); font-size: 11px; letter-spacing: .07em; text-transform: uppercase; color: var(--ink-faint); font-weight: 500; }
  td.n, td.mono { font-family: var(--mono); font-variant-numeric: tabular-nums; }
  .scroll { overflow-x: auto; }
  .chip { display: inline-block; width: 34px; height: 34px; border-radius: 7px; border: 1px solid var(--hairline); vertical-align: middle; }
  .spec { display: grid; grid-template-columns: 1fr; gap: 2px; padding: 14px 0; border-bottom: 1px solid var(--hairline); }
  @media (min-width: 820px) { .spec { grid-template-columns: 1fr 260px; align-items: baseline; } }
  .spec__meta { font-family: var(--mono); font-size: 11.5px; color: var(--ink-faint); line-height: 1.7; }
  .tag { display: inline-block; padding: 1px 7px; border-radius: 999px; background: var(--panel); border: 1px solid var(--hairline); font-family: var(--mono); font-size: 11px; color: var(--ink-soft); }
</style>

<div class="wrap">
  <header style="display:flex;flex-direction:column;gap:12px">
    <p class="mono muted">Billease · landing page template</p>
    <h1>Colour and type</h1>
    <p class="lede">Only what these pages use: ${semantic.reduce((n, [, i]) => n + i.length, 0)} semantic colours over ${primitives.length} primitives, and ${styles.length} type styles on an ${scale.length}-step scale. Generated from the stylesheets, so it cannot drift.</p>
  </header>

  <section>
    <h2>Type scale</h2>
    <p class="muted" style="font-size:14px">T-shirt sizes. Every value a whole pixel — nothing resolves to 12.5 or 41.9.</p>
    <div class="scroll"><table>
      <thead><tr><th>Token</th><th>Value</th><th>Source</th><th>Specimen</th></tr></thead>
      <tbody>${scale.map((s) => `
        <tr>
          <td class="mono">${s.name}</td>
          <td class="n">${s.px}</td>
          <td class="mono muted">${s.from.startsWith('var(') ? `library · ${esc(s.from)}` : 'landing layer'}</td>
          <td style="font-size:${s.px}; line-height:1.1; font-weight:600">Aa</td>
        </tr>`).join('')}
      </tbody>
    </table></div>
  </section>

  <section>
    <h2>Display steps — the only responsive type</h2>
    <p class="muted" style="font-size:14px">Four steps, each a t-shirt size at every tier. They step at breakpoints rather than scaling fluidly, which is what keeps every rendered size whole.</p>
    <div class="scroll"><table>
      <thead><tr><th>Style</th>${tiers.map((t) => `<th>${t.label}</th>`).join('')}<th>Weight</th><th>Used for</th></tr></thead>
      <tbody>${['--display-sm', '--display-md', '--display-lg', '--display-xl'].map((step) => {
        const style = responsive.find((s) => s.size === `var(${step})`)
        const purpose = { '--display-sm': 'Card and sub-section headings', '--display-md': 'Section headings', '--display-lg': 'Hero headline', '--display-xl': 'Full-screen statement' }[step]
        return `
        <tr>
          <td class="mono">.${style?.name ?? step.replace('--', '')}</td>
          ${tiers.map((t) => {
            const token = t.steps[step]
            const value = token ? resolve(landing.get(`--${token.replace('--', '')}`)) : '—'
            return `<td class="n">${value}<br><span class="muted" style="font-size:11px">${token ?? ''}</span></td>`
          }).join('')}
          <td class="n">${style?.weight ?? ''}</td>
          <td class="muted">${purpose}</td>
        </tr>`
      }).join('')}
      </tbody>
    </table></div>
    ${responsive.map((s) => `
    <div class="spec">
      <span style="font-size:${s.size}; font-weight:${s.weight}; line-height:${s.lh}; letter-spacing:-.02em">Your Access Card is ready</span>
      <span class="spec__meta">.${s.name} · resize to see it step</span>
    </div>`).join('')}
  </section>

  <section>
    <h2>Fixed styles — ${fixed.length} in use</h2>
    <p class="muted" style="font-size:14px">Same size at every breakpoint. Set type with these classes, never a raw font-size.</p>
    ${fixed.map((s) => `
    <div class="spec">
      <span class="${s.name}" style="font-size:${s.px}; font-weight:${s.weight}; line-height:${s.lh}">Activate your Access Card in a minute</span>
      <span class="spec__meta">.${s.name}<br>${s.px} · ${s.weight} · line-height ${s.lh} · <span class="tag">${s.tshirt ?? 'off-scale'}</span> · ${s.uses} uses</span>
    </div>`).join('')}
  </section>

  <section>
    <h2>Colour — semantic</h2>
    <p class="muted" style="font-size:14px">What components reference. Each one points at a primitive; that mapping is the design decision.</p>
    ${semantic.map(([label, items]) => `
    <div class="sub">
      <h3>${label}</h3>
      <div class="scroll"><table>
        <thead><tr><th></th><th>Semantic token</th><th>Primitive</th><th>Value</th></tr></thead>
        <tbody>${items.map((i) => `
          <tr>
            <td style="width:46px"><span class="chip" style="background:${i.hex}"></span></td>
            <td class="mono">${i.name}</td>
            <td class="mono muted">${i.primitive ?? '—'}</td>
            <td class="n muted">${esc(i.hex)}</td>
          </tr>`).join('')}
        </tbody>
      </table></div>
    </div>`).join('')}
  </section>

  <section>
    <h2>Colour — primitives</h2>
    <p class="muted" style="font-size:14px">The ${primitives.length} raw values these pages reach, through the semantic tokens above or directly.</p>
    <div class="scroll"><table>
      <thead><tr><th></th><th>Primitive</th><th>Value</th><th>Reached through</th></tr></thead>
      <tbody>${primitives.map((p) => `
        <tr>
          <td style="width:46px"><span class="chip" style="background:${p.hex}"></span></td>
          <td class="mono">${p.name}</td>
          <td class="n muted">${esc(p.hex)}</td>
          <td class="mono muted">${p.usedVia.join(', ') || (p.direct ? 'used directly' : '—')}</td>
        </tr>`).join('')}
      </tbody>
    </table></div>
    <p class="note">A component should reference a semantic token, never a primitive. The few used directly are places where no semantic token exists — a dark card fill, the download panel's blue.</p>
  </section>
</div>
`

const out = process.argv[2] || 'token-reference.html'
writeFileSync(out, html)
console.log(`written: ${out}`)
console.log(`  ${semantic.reduce((n, [, i]) => n + i.length, 0)} semantic colours · ${primitives.length} primitives · ${scale.length} type sizes · ${styles.length} styles`)
