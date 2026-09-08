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

const iconsJs = read('src/assets/icons/icons.generated.js')

const allIcons = [...iconsJs.matchAll(/'([a-z0-9-]+)':\s*\{"solar":"([^"]+)","body":"([\s\S]*?)","viewBox":"([^"]+)"\}/g)]
  .map(([, name, solar, body, viewBox]) => ({ name, solar, body: body.replace(/\\"/g, '"'), viewBox }))

// A quoted name anywhere counts, so an icon chosen in an expression
// (`open ? 'close' : 'burger-menu'`) is not reported as unused.
const componentSrc = ['sections', 'ui'].flatMap((d) =>
  readdirSync(join(root, 'src/components', d)).filter((f) => f.endsWith('.jsx'))
    .map((f) => readFileSync(join(root, 'src/components', d, f), 'utf8'))).join('\n')
const contentSrc = readdirSync(join(root, 'src/content/products'))
  .filter((f) => f.endsWith('.js')).map((f) => readFileSync(join(root, 'src/content/products', f), 'utf8')).join('\n')
const iconHaystack = componentSrc + contentSrc

const icons = allIcons.filter((i) => new RegExp(`'${i.name}'`).test(iconHaystack))

/** A few real icons to show the size steps at. */
const sampleIcons = ['chevron-down', 'lock', 'incognito', 'document', 'chat-outline']
  .map((n) => allIcons.find((i) => i.name === n))
  .filter(Boolean)

// Icons set their size inline, so usage is read from the rendered pages.
const iconSizes = [...tokens.keys()]
  .filter((k) => k.startsWith('--icon-size-'))
  .map((k) => ({
    name: k,
    tshirt: k.replace('--icon-size-', ''),
    px: resolve(tokens.get(k)),
    used: new RegExp(`var\\(${k}\\)`).test(rendered) || new RegExp(`var\\(${k}\\)`).test(usedCss),
  }))
  .filter((i) => i.used)


/* ── Sections ───────────────────────────────────────────────────────────── */

const { SECTIONS, SECTION_ALIASES } = await import('../src/components/sections/index.js')
const { patterns } = await import('../src/content/patterns.js')

/**
 * When to reach for each section, in the order a page uses them.
 *
 * One column, not two: the schematic already shows the arrangement and the
 * name already says what it is, so the only thing left worth writing is the
 * decision — what has to be true about the page for this section to belong on
 * it.
 */
const SECTION_ORDER = [
  ['hero', 'Always. It carries the page\u2019s one action, and a page has exactly one.'],
  ['benefits', 'The reader needs reasons before they will read a process. Three or four, never a feature list.'],
  ['statement', 'Two sections would otherwise run into each other and the page needs a beat.'],
  ['stepsSplit', 'The process is easier to believe when you can see the app or product beside it.'],
  ['steps', 'The process is self-explanatory and an image would only decorate it.'],
  ['useCases', '\u201cWhere can I actually use this?\u201d is a question the product genuinely raises.'],
  ['featureSplit', 'One idea needs a visual, and three supporting points underneath it.'],
  ['panel', 'One idea should read as separate from the page around it.'],
  ['featureRows', 'Several features each need a paragraph and an image of their own.'],
  ['choicePair', 'The page\u2019s job is choosing between two products rather than explaining one.'],
  ['pricing', 'Cost is the blocker, and there are terms worth comparing side by side.'],
  ['conditions', 'Something must be known before deciding: cost, timing, eligibility. Never leave these to the FAQ.'],
  ['faq', 'Real objections survive everything the page has already said.'],
  ['appDownload', 'The action happens in an app, so the page ends by getting them there.'],
  ['finalCta', 'The page ends with no other action nearby to repeat.'],
]

/** The catalogue groups a few sections together, so map key to its group. */
const groupFor = (key) => patterns.find((g) => g.variants.some((v) => v.props.type === key))

/**
 * What the page actually uses, read from its own content file rather than from
 * the catalogue. A card for `pricing` on a page with no pricing section is a
 * pattern someone has to ask about.
 */
const usedTypes = scope.flatMap((page) => page.sections.map((sec) => sec.type))
const inUse = (key) => usedTypes.includes(key)

const sectionRows = SECTION_ORDER.filter(([key]) => inUse(key)).map(([key, when]) => {
  const group = groupFor(key)
  const variants = (group?.variants ?? []).filter((v) => v.props.type === key)
  return {
    key,
    when,
    group: group?.id,
    versions: variants.map((v) => v.version),
  }
})

const SITE = process.env.SITE_URL || 'https://landing-page-eight-opal-12.vercel.app'

/**
 * A small schematic per section: grey blocks in the arrangement the section
 * puts on the page. Faster to recognise than a sentence, and it cannot go out
 * of date the way a screenshot would, because it describes the arrangement
 * rather than the content.
 */
const b = (style) => `<i style="${style}"></i>`
const THUMBS = {
  hero: `<div class="tb tb-row">
      <div class="tb-col">${b('height:5px;width:80%')}${b('height:5px;width:60%')}${b('height:4px;width:40%;opacity:.5')}${b('height:8px;width:34px;border-radius:99px;margin-top:2px')}</div>
      ${b('flex:1;align-self:stretch')}</div>`,
  benefits: `<div class="tb tb-row">${b('flex:1;align-self:stretch')}${b('flex:1;align-self:stretch')}${b('flex:1;align-self:stretch')}</div>`,
  statement: `<div class="tb tb-center">${b('height:6px;width:70%')}${b('height:6px;width:50%')}${b('height:8px;width:30px;border-radius:99px;margin-top:4px')}</div>`,
  stepsSplit: `<div class="tb tb-row">${b('flex:1;align-self:stretch')}
      <div class="tb-col">${b('height:4px;width:90%')}${b('height:4px;width:70%')}${b('height:4px;width:80%')}${b('height:4px;width:60%')}</div></div>`,
  steps: `<div class="tb tb-row tb-top">
      <div class="tb-col">${b('height:8px;width:8px;border-radius:99px')}${b('height:4px;width:100%')}</div>
      <div class="tb-col">${b('height:8px;width:8px;border-radius:99px')}${b('height:4px;width:100%')}</div>
      <div class="tb-col">${b('height:8px;width:8px;border-radius:99px')}${b('height:4px;width:100%')}</div></div>`,
  useCases: `<div class="tb tb-col">${b('height:12px;width:100%')}${b('height:12px;width:100%')}${b('height:12px;width:100%')}</div>`,
  mediaPoints: `<div class="tb tb-col">
      <div class="tb-row" style="flex:1"><div class="tb-col">${b('height:4px;width:90%')}${b('height:4px;width:70%')}</div>${b('flex:1;align-self:stretch')}</div>
      <div class="tb-row">${b('flex:1;height:5px')}${b('flex:1;height:5px')}${b('flex:1;height:5px')}</div></div>`,
  panel: `<div class="tb">${b('width:100%;height:100%;border-radius:6px;display:flex')}</div>`,
  featureRows: `<div class="tb tb-col">
      <div class="tb-row" style="flex:1">${b('flex:1;align-self:stretch')}<div class="tb-col">${b('height:4px;width:90%')}${b('height:4px;width:60%')}</div></div>
      <div class="tb-row" style="flex:1"><div class="tb-col">${b('height:4px;width:90%')}${b('height:4px;width:60%')}</div>${b('flex:1;align-self:stretch')}</div></div>`,
  choicePair: `<div class="tb tb-row">${b('flex:1;align-self:stretch;border-radius:6px')}${b('flex:1;align-self:stretch;border-radius:6px')}</div>`,
  pricing: `<div class="tb tb-row tb-top">${b('flex:1;height:100%;border-radius:4px')}${b('flex:1;height:100%;border-radius:4px')}${b('flex:1;height:100%;border-radius:4px')}</div>`,
  conditions: `<div class="tb tb-col">
      <div class="tb-row">${b('width:6px;height:6px')}${b('flex:1;height:5px')}</div>
      <div class="tb-row">${b('width:6px;height:6px')}${b('flex:1;height:5px')}</div>
      <div class="tb-row">${b('width:6px;height:6px')}${b('flex:1;height:5px')}</div></div>`,
  faq: `<div class="tb tb-col">
      <div class="tb-row">${b('flex:1;height:5px')}${b('width:5px;height:5px')}</div>
      <div class="tb-row">${b('flex:1;height:5px')}${b('width:5px;height:5px')}</div>
      <div class="tb-row">${b('flex:1;height:5px')}${b('width:5px;height:5px')}</div>
      <div class="tb-row">${b('flex:1;height:5px')}${b('width:5px;height:5px')}</div></div>`,
  appDownload: `<div class="tb"><div class="tb-row" style="width:100%;height:100%;border-radius:6px;background:var(--panel);padding:6px;box-sizing:border-box">
      ${b('width:18px;height:18px;border-radius:5px;align-self:center')}
      <div class="tb-col">${b('height:4px;width:80%')}${b('height:3px;width:60%;opacity:.6')}${b('height:6px;width:70%')}</div></div></div>`,
  finalCta: `<div class="tb tb-center">${b('height:5px;width:60%')}${b('height:4px;width:40%;opacity:.6')}${b('height:8px;width:28px;border-radius:99px;margin-top:2px')}</div>`,
}

/* ── Buttons ────────────────────────────────────────────────────────────── */

const buttonSrc = readFileSync(join(root, 'src/components/ds/Button.jsx'), 'utf8')
const jsMap = (name) => {
  const m = buttonSrc.match(new RegExp(`const ${name} = \\{([^}]+)\\}`))
  return Object.fromEntries([...m[1].matchAll(/'?([a-z0-9]+)'?:\s*'?([^,'\n]+)'?/g)].map((x) => [x[1], x[2].trim()]))
}
const btnHeight = jsMap('HEIGHT')
const btnPad = jsMap('PADDING_H')
// What the web build actually paints. The Figma set records active at 30% and
// pressed at 50%; a pointer hover wants a lighter touch than a finger, so the
// page uses 10% on hover and 30% on press, both from the alpha token scale.
const WEB_OVERLAY = { hover: 'var(--alpha-black-10)', pressed: 'var(--alpha-black-30)' }
const STATES = ['default', 'hover', 'pressed', 'disabled']
const variantSpec = (variant) => {
  const block = buttonSrc.match(new RegExp(`  ${variant}: \\{[\\s\\S]*?\\n  \\},`))[0]
  const row = (state) => block.match(new RegExp(`${state}:\\s*\\{([^}]+)\\}`))?.[1] ?? ''
  const field = (state, k) => (row(state).match(new RegExp(`${k}:\\s*'([^']+)'`)) || [])[1]
  const base = field('default', 'bg')

  return Object.fromEntries(STATES.map((state) => {
    if (state === 'hover' || state === 'pressed') {
      const o = WEB_OVERLAY[state]
      return [state, { bg: `linear-gradient(${o}, ${o}), ${base}`, text: field('default', 'text') }]
    }
    const overlay = field(state, 'overlay')
    const bg = field(state, 'bg')
    return [state, {
      bg: overlay && overlay !== 'null' ? `linear-gradient(${overlay}, ${overlay}), ${bg}` : bg,
      text: field(state, 'text'),
    }]
  }))
}
const buttons = [
  { key: 'primary', label: 'Primary', spec: variantSpec('primary') },
  { key: 'secondary', label: 'Secondary', spec: variantSpec('secondary') },
  { key: 'ghost', label: 'Text link', spec: variantSpec('ghost') },
]

/* ── Render ─────────────────────────────────────────────────────────────── */

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
const px = (v) => parseInt(v)

const html = `<title>Patterns and tokens</title>
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
  /* The icon grid. An inline SVG with no size renders at whatever its
     container allows, which for a 24-unit viewBox in a grid cell is enormous —
     so every icon here is sized explicitly. */
  .cards { display: grid; gap: 14px; grid-template-columns: 1fr; }
  @media (min-width: 640px) { .cards { grid-template-columns: 1fr 1fr; } }
  @media (min-width: 1000px) { .cards { grid-template-columns: repeat(3, 1fr); } }
  .card {
    display: flex; flex-direction: column; overflow: hidden; text-decoration: none;
    border: 1px solid var(--hairline); border-radius: 14px; background: var(--ground);
    color: inherit; transition: border-color .14s ease, transform .14s ease;
  }
  .card:hover { border-color: var(--ink-faint); transform: translateY(-2px); }
  .card__art { display: grid; place-items: center; padding: 22px; background: var(--panel); }
  .card__body { display: flex; flex-direction: column; gap: 6px; padding: 16px 18px 18px; }
  .card__name { font-size: 14px; color: var(--ink); }
  .card__when { font-size: 13.5px; color: var(--ink-soft); line-height: 1.45; }
  .card__v { font-family: var(--mono); font-size: 11px; color: var(--ink-faint); }

  /* Section schematics: a frame and grey blocks, nothing content-specific. */
  .tb {
    width: 96px; height: 60px; padding: 6px; box-sizing: border-box;
    border: 1px solid var(--hairline); border-radius: 6px; background: var(--ground);
    display: flex; gap: 4px;
  }
  .tb-row { display: flex; gap: 4px; align-items: center; width: 100%; }
  .tb-top { align-items: stretch; }
  .tb-col { display: flex; flex-direction: column; gap: 3px; flex: 1; justify-content: center; }
  .tb-center { flex-direction: column; align-items: center; justify-content: center; gap: 3px; }
  .tb i { display: block; background: var(--hairline); border-radius: 2px; }

  .icons { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 10px; }
  .icon {
    display: grid; justify-items: center; gap: 8px; text-align: center;
    padding: 14px 6px; border: 1px solid var(--hairline); border-radius: 10px;
  }
  .icon svg { width: 24px; height: 24px; color: var(--ink); }
  .icon code { font-size: 11px; word-break: break-word; }

  /* The size samples in the table set their own width and height inline. */
  .icon-sample svg { flex: none; color: var(--ink); }

  .btn-demo { transition: background .15s; cursor: pointer; }
  .btn-demo:hover { background: linear-gradient(var(--alpha-black-10), var(--alpha-black-10)), var(--bg-primary) !important; }
  .btn-demo:active { background: linear-gradient(var(--alpha-black-30), var(--alpha-black-30)), var(--bg-primary) !important; }

  .spec { display: grid; grid-template-columns: 1fr; gap: 2px; padding: 14px 0; border-bottom: 1px solid var(--hairline); }
  @media (min-width: 820px) { .spec { grid-template-columns: 1fr 260px; align-items: baseline; } }
  .spec__meta { font-family: var(--mono); font-size: 11.5px; color: var(--ink-faint); line-height: 1.7; }
  .tag { display: inline-block; padding: 1px 7px; border-radius: 999px; background: var(--panel); border: 1px solid var(--hairline); font-family: var(--mono); font-size: 11px; color: var(--ink-soft); }
</style>

<div class="wrap">
  <header style="display:flex;flex-direction:column;gap:12px">
    <p class="mono muted">Billease · landing page template</p>
    <h1>Patterns and tokens</h1>
    <p class="lede">The sections a page is built from, and the colour, type, icons and buttons they use. Generated from the components and stylesheets, so it cannot drift.</p>
  </header>

  <section>
    <h2>Sections</h2>
    <p class="muted" style="font-size:14px">
      The vocabulary for briefing a page: name these in the order you want them and the page is assembled.
      Open one to see its variants rendered by the real components, each with the content object that produces it.
    </p>

    <div class="cards">${sectionRows.map((r) => `
      <a class="card" href="${SITE}/patterns?section=${r.group}" target="_blank" rel="noreferrer">
        <span class="card__art">${THUMBS[r.key] ?? ''}</span>
        <span class="card__body">
          <span class="card__name mono">${r.key}</span>
          <span class="card__when">${r.when}</span>
          ${r.versions.length ? `<span class="card__v">${r.versions.join(' · ')}</span>` : ''}
        </span>
      </a>`).join('')}
    </div>

    ${(() => {
      const rest = SECTION_ORDER.filter(([key]) => !inUse(key)).map(([key]) => key)
      return rest.length ? `<p class="note">Also in the template, unused by this page: ${rest.map((k) => `<code>${k}</code>`).join(' · ')}. <a href="${SITE}/patterns">See them all</a>.</p>` : ''
    })()}
  </section>

  <section>
    <h2>Type scale</h2>
    <p class="muted" style="font-size:14px">T-shirt sizes. Every value is a whole pixel; nothing resolves to 12.5 or 41.9.</p>
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
    <h2>Display steps</h2>
    <p class="muted" style="font-size:14px">Four steps, each a t-shirt size at every tier. They step at breakpoints rather than scaling fluidly, which is what keeps every rendered size whole.</p>
    <div class="scroll"><table>
      <thead><tr><th>Style</th>${tiers.map((t) => `<th>${t.label}</th>`).join('')}<th>Weight</th><th>Used for</th><th>At this width</th></tr></thead>
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
          <td style="font-size: var(${step}); font-weight: ${style?.weight ?? 700}; line-height: 1.1; letter-spacing: -0.02em; white-space: nowrap">Aa</td>
        </tr>`
      }).join('')}
      </tbody>
    </table></div>
  </section>

  <section>
    <h2>Fixed styles</h2>
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
      <a href="https://www.streamlinehq.com/icons/solar">Solar Linear</a>, from Streamline. Path data is generated from <code>@iconify-json/solar</code> rather than pasted in by hand, so every icon keeps the same stroke weight and grid.
    </p>

    <div class="scroll"><table>
      <thead><tr><th>Token</th><th>Scale</th><th>Size</th><th>Sample</th></tr></thead>
      <tbody>${iconSizes.map((i) => `
        <tr>
          <td class="mono">${i.name}</td>
          <td class="mono">${i.tshirt}</td>
          <td class="n">${i.px}</td>
          <td>
            <span class="icon-sample" style="display:inline-flex; gap:12px; align-items:center">
              ${sampleIcons.slice(0, 4).map((ic) => `<svg viewBox="${ic.viewBox}" fill="none" style="width:${i.px};height:${i.px}">${ic.body}</svg>`).join('')}
            </span>
          </td>
        </tr>`).join('')}
      </tbody>
    </table></div>

    <div class="sub">
      <h3>The set</h3>
      <div class="icons">${icons.map((i) => `
        <div class="icon">
          <svg viewBox="${i.viewBox}" fill="none" aria-hidden="true">${i.body}</svg>
          <code>${i.name}</code>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section>
    <h2>Buttons</h2>
    <p class="muted" style="font-size:14px">
      <a href="https://www.figma.com/design/qESeTFW1GEEosrYnm4Hu3b/Billease-Library--Native-app-?node-id=16-182">Billease library, node 16:182</a>.
      Hover and press the examples. They carry the same overlays the page does.
    </p>

    <div class="scroll"><table>
      <thead><tr><th>Variant</th>${STATES.map((st) => `<th>${st}</th>`).join('')}</tr></thead>
      <tbody>${buttons.map((b) => `
        <tr>
          <td class="mono">${b.label}</td>
          ${STATES.map((st) => {
            const sp = b.spec[st] || {}
            const ghost = b.key === 'ghost'
            return `<td><span style="display:inline-flex;align-items:center;height:${btnHeight.lg}px;padding-inline:${ghost ? 0 : btnPad.lg}px;border-radius:${ghost ? '0' : '9999px'};background:${sp.bg || 'transparent'};color:${sp.text};font-size:14px;font-weight:600;${ghost ? 'text-decoration:underline;' : ''}white-space:nowrap">Open app</span></td>`
          }).join('')}
        </tr>`).join('')}
      </tbody>
    </table></div>

    <div class="sub">
      <h3>Sizes</h3>
      <div class="scroll"><table>
        <thead><tr><th>Scale</th><th>Height</th><th>Padding</th><th>Example</th></tr></thead>
        <tbody>${['xl', 'lg', 'md', 'sm'].filter((k) => btnHeight[k]).map((k) => `
          <tr>
            <td class="mono">${k}</td>
            <td class="n">${btnHeight[k]}px</td>
            <td class="n muted">${btnPad[k]}px</td>
            <td><span class="btn-demo" style="display:inline-flex;align-items:center;height:${btnHeight[k]}px;padding-inline:${btnPad[k]}px;border-radius:9999px;background:var(--bg-primary);color:var(--text-on-dark);font-size:${k === 'sm' ? 14 : 16}px;font-weight:600;cursor:pointer">Open app</span></td>
          </tr>`).join('')}
        </tbody>
      </table></div>
    </div>
  </section>

  <section>
    <h2>Colour: semantic</h2>
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
            <td class="mono muted">${i.primitive ?? ''}</td>
            <td class="n muted">${esc(i.hex)}</td>
          </tr>`).join('')}
        </tbody>
      </table></div>
    </div>`).join('')}
  </section>

  <section>
    <h2>Colour: primitives</h2>
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
  </section>
</div>
`

const out = process.argv[2] || 'token-reference.html'
writeFileSync(out, html)
console.log(`written: ${out}`)
console.log(`  ${semantic.reduce((n, [, i]) => n + i.length, 0)} semantic colours · ${primitives.length} primitives · ${scale.length} type sizes · ${styles.length} styles`)
