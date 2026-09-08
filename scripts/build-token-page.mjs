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

/**
 * Usage, taken from what the pages actually render rather than from which
 * files exist.
 *
 * Scanning source files counted colours that can never appear: a Button
 * variant nobody uses, a dev-only "unknown section" warning, an IconTile tone
 * no page passes. Rendering the pages and reading the result counts only what
 * a visitor can see.
 */
const { pages, defaultPage } = await import('../src/content/index.js')

/**
 * Which pages count as "this project".
 *
 * The live product page by default. pay-later and cash-loan are template
 * demonstrations carrying placeholder pricing, and their sections drag in
 * colours — a success tick, a featured-plan border — that the real page never
 * paints. Set PAGES=all to include them.
 */
const scope = process.env.PAGES === 'all' ? pages : [defaultPage]
const { default: LandingPage } = await import('../src/LandingPage.jsx')
const { renderToStaticMarkup } = await import('react-dom/server')
const { createElement } = await import('react')

const rendered = scope.map((page) => renderToStaticMarkup(createElement(LandingPage, { page }))).join('\n')

/**
 * A rule counts only if it actually matches something on a rendered page.
 *
 * Matching by class name alone was not enough: `.l-band--dark .c-security__icon`
 * survived because both classes exist somewhere, even though no dark section
 * ever contains that icon. Selectors are matched against a parsed document
 * instead, so a variant that never occurs brings no colours with it.
 */
const { parse } = await import('node-html-parser')
const docs = scope.map((page) => parse(renderToStaticMarkup(createElement(LandingPage, { page }))))

const matches = (selector) => {
  // Strip pseudo-classes a static document cannot satisfy, then ask whether
  // the rest exists. :focus and :hover rules count — they are reachable.
  const probe = selector
    .replace(/:(?:hover|focus|focus-visible|active|first-child|last-child|nth-child\([^)]*\))/g, '')
    .replace(/::[a-z-]+/g, '')
    .split(',')[0]
    .trim()
  if (!probe || /^(?::root|html|body|\*)/.test(probe)) return true
  try { return docs.some((d) => d.querySelector(probe)) } catch { return true }
}

const usedCss = landingCss
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .split(/(?=^[.\[a-z@:*])/m)
  .filter((rule) => {
    if (!rule.includes('{')) return false
    const selector = rule.slice(0, rule.indexOf('{'))
    if (rule.trimStart().startsWith('@')) return true      // media wrappers: inspect contents below
    return matches(selector)
  })
  .join('\n')

/** Inline styles the components emit, which is where Button paints itself. */
const inlineVars = [...rendered.matchAll(/var\((--[a-z0-9-]+)\)/g)].map((m) => m[0]).join(' ')

const sources = [usedCss, inlineVars].join('\n')

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
    // Counted from the rendered pages, so a class defined but never applied
    // does not appear.
    const uses = (rendered.match(new RegExp(`class="[^"]*\\b${name}\\b`, 'g')) || []).length
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

/* ── Icons ──────────────────────────────────────────────────────────────── */

const iconSizes = [...tokens.keys()].filter((k) => k.startsWith('--icon-size-'))
  .map((k) => ({ name: k, px: resolve(tokens.get(k)), used: new RegExp(`var\\(${k}\\)`).test(usedCss) }))
const iconUses = { xs: 'Inline with text, e.g. a tick in a list', sm: 'Controls: FAQ chevron, link arrow', md: 'Standalone icons and the mobile menu', lg: 'Not used on these pages', xl: 'Mobile menu button', '2xl': 'Icon tiles' }

/* ── Buttons ────────────────────────────────────────────────────────────── */

const buttonSrc = readFileSync(join(root, 'src/components/ds/Button.jsx'), 'utf8')
const jsMap = (name) => {
  const m = buttonSrc.match(new RegExp(`const ${name} = \\{([^}]+)\\}`))
  return Object.fromEntries([...m[1].matchAll(/'?([a-z0-9]+)'?:\s*'?([^,'\n]+)'?/g)].map((x) => [x[1], x[2].trim()]))
}
const btnHeight = jsMap('HEIGHT')
const btnPad = jsMap('PADDING_H')
const variantSpec = (variant) => {
  const block = buttonSrc.match(new RegExp(`  ${variant}: \\{[\\s\\S]*?\\n  \\},`))[0]
  const def = block.match(/default:\s*\{([^}]+)\}/)[1]
  const g = (k) => (def.match(new RegExp(`${k}:\\s*'([^']+)'`)) || [])[1]
  return { bg: g('bg'), text: g('text') }
}
const buttons = [
  { key: 'primary', label: 'Primary', spec: variantSpec('primary'), note: 'The page\u2019s one action. Header, hero and sticky bar all carry the same label.' },
  { key: 'secondary', label: 'Secondary', spec: variantSpec('secondary'), note: 'An alternative action beside a primary one. Not used on the Access Card page.' },
  { key: 'ghost', label: 'Text link', spec: variantSpec('ghost'), note: 'No fill, no radius. For a tertiary action that should not look like a button.' },
]

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
    <p class="lede">Only what the ${scope.length === 1 ? 'Access Card page uses' : 'pages use'}: ${semantic.reduce((n, [, i]) => n + i.length, 0)} semantic colours over ${primitives.length} primitives, and ${styles.length} type styles on an ${scale.length}-step scale. Generated from the stylesheets, so it cannot drift.</p>
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
    <div class="scroll"><table>
      <thead><tr><th>Class</th><th>Size</th><th>Scale</th><th>Weight</th><th>Line height</th><th>Uses</th><th>Specimen</th></tr></thead>
      <tbody>${fixed.map((s) => `
        <tr>
          <td class="mono">.${s.name}</td>
          <td class="n">${s.px}</td>
          <td class="mono muted">${s.tshirt?.replace('--font-size-', '') ?? '—'}</td>
          <td class="n">${s.weight}</td>
          <td class="n muted">${s.lh}</td>
          <td class="n muted">${s.uses}</td>
          <td style="font-size:${s.px}; font-weight:${s.weight}; line-height:1.2; max-width:280px">Activate your card</td>
        </tr>`).join('')}
      </tbody>
    </table></div>
  </section>

  <section>
    <h2>Icons</h2>
    <p class="muted" style="font-size:14px">
      <a href="https://www.streamlinehq.com/icons/solar" style="color:var(--text-active)">Solar Linear</a>, from Streamline.
      One pack, one stroke weight, no exceptions — an icon from anywhere else is visible immediately at these sizes.
      Path data is generated from <code>@iconify-json/solar</code>; never pasted in by hand.
    </p>
    <div class="scroll"><table>
      <thead><tr><th></th><th>Token</th><th>Size</th><th>Where it is used</th></tr></thead>
      <tbody>${iconSizes.filter((i) => i.used).map((i) => {
        const key = i.name.replace('--icon-size-', '')
        return `
        <tr>
          <td style="width:60px"><span style="display:inline-block;width:${i.px};height:${i.px};border-radius:4px;background:var(--bg-sunken)"></span></td>
          <td class="mono">${i.name}</td>
          <td class="n">${i.px}</td>
          <td class="muted">${iconUses[key] ?? ''}</td>
        </tr>`
      }).join('')}
      </tbody>
    </table></div>
    <p class="note">Sizes come from the Figma variables export unchanged: <code>xs 16 · sm 20 · md 24 · lg 32 · xl 40 · 2xl 48</code>. Nothing was added for this project, and nothing is missing.</p>
  </section>

  <section>
    <h2>Buttons</h2>
    <p class="muted" style="font-size:14px">
      From the <a href="https://www.figma.com/design/qESeTFW1GEEosrYnm4Hu3b/Billease-Library--Native-app-?node-id=16-182" style="color:var(--text-active)">Billease library, node 16:182</a>.
      Three of the five variants are used here; the gradient variant is deliberately not.
    </p>
    <div class="scroll"><table>
      <thead><tr><th>Variant</th><th>Example</th><th>Fill</th><th>Label</th><th>When</th></tr></thead>
      <tbody>${buttons.map((b) => `
        <tr>
          <td class="mono">${b.label}</td>
          <td style="width:200px">
            <span style="display:inline-flex;align-items:center;height:${btnHeight.lg}px;padding-inline:${b.key === 'ghost' ? 0 : btnPad.lg}px;border-radius:${b.key === 'ghost' ? '0' : '9999px'};background:${b.spec.bg};color:${b.spec.text};font-size:16px;font-weight:600;${b.key === 'ghost' ? 'text-decoration:underline;' : ''}">Open Billease app</span>
          </td>
          <td class="mono muted">${esc(b.spec.bg)}</td>
          <td class="mono muted">${esc(b.spec.text)}</td>
          <td class="muted">${b.note}</td>
        </tr>`).join('')}
      </tbody>
    </table></div>

    <div class="sub">
      <h3>Sizes</h3>
      <div class="scroll"><table>
        <thead><tr><th>Size</th><th>Height</th><th>Padding</th><th>Example</th><th>Source</th></tr></thead>
        <tbody>${['xl', 'lg', 'md', 'sm'].filter((k) => btnHeight[k]).map((k) => `
          <tr>
            <td class="mono">${k}</td>
            <td class="n">${btnHeight[k]}px</td>
            <td class="n muted">${btnPad[k]}px</td>
            <td><span style="display:inline-flex;align-items:center;height:${btnHeight[k]}px;padding-inline:${btnPad[k]}px;border-radius:9999px;background:var(--bg-primary);color:var(--text-on-dark);font-size:${k === 'sm' ? 14 : 16}px;font-weight:600">Open app</span></td>
            <td class="muted">${k === 'xl' ? '<strong>Added for landing pages.</strong> The library stops at 48, which reads small under display type.' : 'Figma library'}</td>
          </tr>`).join('')}
        </tbody>
      </table></div>
      <p class="note">These pages use <code>xl</code> for the hero and sticky bar, and <code>lg</code> in the header, where a 52px button in a 72px bar leaves no clearance.</p>
    </div>
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
