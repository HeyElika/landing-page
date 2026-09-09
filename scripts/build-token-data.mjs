/**
 * Extracts the token data the reference needs into a module the app imports.
 *
 * The reference used to be a separate static page with its own copy of the
 * markup and CSS. Two pages describing one system drift: the catalogue showed
 * real components, the reference showed tables, and neither knew about the
 * other. Now the parsing happens here, the rendering happens in React beside
 * the catalogue, and there is one page.
 *
 * Run by `npm run build`, and by `npm run tokens` after a token change.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => readFileSync(join(root, p), 'utf8')

const tokensCss = read('src/styles/tokens.css')
const landingCss = read('src/styles/landing.css')
const iconsJs = read('src/assets/icons/icons.generated.js')

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
const backing = (v) => (v?.match(/^var\((--[a-z0-9-]+)\)$/) || [])[1]

/* Usage, from what the live page renders. */
const { defaultPage } = await import('../src/content/index.js')
const { default: LandingPage } = await import('../src/LandingPage.jsx')
const { parse } = await import('node-html-parser')

const rendered = renderToStaticMarkup(createElement(LandingPage, { page: defaultPage }))
const doc = parse(rendered)
const classes = new Set([...rendered.matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/)))

const matches = (selector) => {
  const probe = selector
    .replace(/:(?:hover|focus|focus-visible|active|first-child|last-child|nth-child\([^)]*\))/g, '')
    .replace(/::[a-z-]+/g, '').split(',')[0].trim()
  if (!probe || /^(?::root|html|body|\*)/.test(probe)) return true
  try { return Boolean(doc.querySelector(probe)) } catch { return true }
}
const usedCss = landingCss.replace(/\/\*[\s\S]*?\*\//g, '').split(/(?=^[.\[a-z@:*])/m)
  .filter((rule) => rule.includes('{') && (rule.trimStart().startsWith('@') || matches(rule.slice(0, rule.indexOf('{')))))
  .join('\n')
const referenced = new Set([...(usedCss + rendered).matchAll(/var\((--[a-z0-9-]+)/g)].map((m) => m[1]))
for (const name of [...referenced]) {
  let v = all.get(name)
  for (let i = 0; i < 6 && v; i++) { const b = backing(v); if (!b) break; referenced.add(b); v = all.get(b) }
}

/* Type. */
const allScale = [...landing.keys()].filter((k) => k.startsWith('--font-size-'))
  .map((k) => ({ name: k, px: resolve(landing.get(k)), from: landing.get(k) }))
const byPx = Object.fromEntries(allScale.map((s) => [s.px, s.name]))

const styles = []
for (const css of [tokensCss, landingCss]) {
  for (const m of css.matchAll(/^\.((?:body|heading|link|display)-[a-z0-9-]+)\s*\{([^}]+)\}/gm)) {
    const [, name, body] = m
    const g = (p) => (body.match(new RegExp(`${p}:\\s*([^;]+);`)) || [])[1]?.trim()
    const uses = (rendered.match(new RegExp(`class="[^"]*\\b${name}\\b`, 'g')) || []).length
    if (!uses || styles.some((s) => s.name === name)) continue
    const size = g('font-size')
    styles.push({ name, uses, px: resolve(size), tshirt: byPx[resolve(size)], weight: resolve(g('font-weight')), lh: g('line-height'), token: size })
  }
}
const fixed = styles.filter((s) => !s.token?.startsWith('var(--display-')).sort((a, b) => parseInt(b.px) - parseInt(a.px))

const tierOf = (w) => {
  if (!w) return landingCss.slice(0, landingCss.indexOf('@media'))
  const i = landingCss.indexOf(`@media (min-width: ${w}px) {\n  :root {`)
  return i < 0 ? '' : landingCss.slice(i, landingCss.indexOf('\n}', i))
}
const tiers = [['Phone', 0], ['Tablet 768+', 768], ['Desktop 1200+', 1200]].map(([label, w]) => {
  const steps = {}
  for (const m of tierOf(w).matchAll(/(--display-[a-z]+):\s*var\((--font-size-[a-z0-9]+)\)/g)) steps[m[1]] = resolve(landing.get(m[2]))
  return { label, steps }
})
const displaySteps = ['--display-sm', '--display-md', '--display-lg', '--display-xl'].map((step) => ({
  step,
  cls: `display-${step.replace('--display-', '')}`,
  weight: styles.find((s) => s.token === `var(${step})`)?.weight ?? '700',
  purpose: { '--display-sm': 'Card and sub-section headings', '--display-md': 'Section headings', '--display-lg': 'Hero headline', '--display-xl': 'Full-screen statement' }[step],
  perTier: tiers.map((t) => ({ tier: t.label, px: t.steps[step] ?? null })),
}))
const painted = new Set([...fixed.map((f) => f.px), ...displaySteps.flatMap((d) => d.perTier.map((t) => t.px))])
const scale = allScale.filter((s) => painted.has(s.px))

/* Colour. */
const GROUPS = [
  ['Background', (k) => k.startsWith('--bg-') || k.startsWith('--canvas-')],
  ['Text', (k) => k.startsWith('--text-') && !/^--text-(xs|sm|md|lg|xl|2xl|3xl)$/.test(k)],
  ['Border', (k) => k.startsWith('--border-') && !k.startsWith('--border-width')],
  ['Icon', (k) => k.startsWith('--icon-') && !k.startsWith('--icon-size')],
  ['Transparency', (k) => k.startsWith('--alpha-')],
]
const semantic = GROUPS.map(([label, test]) => ({
  label,
  items: [...tokens.keys()].filter((k) => test(k) && referenced.has(k))
    .map((k) => ({ name: k, primitive: backing(tokens.get(k)) ?? null, hex: resolve(tokens.get(k)) })),
})).filter((g) => g.items.length)

const primitives = [...tokens.keys()].filter((k) => k.startsWith('--color-') && referenced.has(k)).map((k) => ({
  name: k,
  hex: resolve(tokens.get(k)),
  via: semantic.flatMap((g) => g.items).filter((s) => s.primitive === k).map((s) => s.name),
}))

/* Icons and buttons. */
const allIcons = [...iconsJs.matchAll(/'([a-z0-9-]+)':\s*\{"solar":"([^"]+)"/g)].map((m) => m[1])
const componentSrc = ['sections', 'ui'].flatMap((d) => readdirSync(join(root, 'src/components', d))
  .filter((f) => f.endsWith('.jsx')).map((f) => readFileSync(join(root, 'src/components', d, f), 'utf8'))).join('\n')
const contentSrc = readdirSync(join(root, 'src/content/products')).filter((f) => f.endsWith('.js'))
  .map((f) => readFileSync(join(root, 'src/content/products', f), 'utf8')).join('\n')
const icons = allIcons.filter((n) => new RegExp(`'${n}'`).test(componentSrc + contentSrc))
const iconSizes = [...tokens.keys()].filter((k) => k.startsWith('--icon-size-'))
  .map((k) => ({ name: k, tshirt: k.replace('--icon-size-', ''), px: resolve(tokens.get(k)) }))
  .filter((i) => new RegExp(`var\\(${i.name}\\)`).test(rendered + usedCss))

const buttonSrc = read('src/components/ds/Button.jsx')
const jsMap = (name) => Object.fromEntries([...buttonSrc.match(new RegExp(`const ${name} = \\{([^}]+)\\}`))[1]
  .matchAll(/'?([a-z0-9]+)'?:\s*'?([^,'\n]+)'?/g)].map((x) => [x[1], x[2].trim()]))

const data = {
  scale, displaySteps, fixed, semantic, primitives, icons, iconSizes,
  buttons: {
    heights: jsMap('HEIGHT'),
    padding: jsMap('PADDING_H'),
    overlay: { hover: 'var(--alpha-black-10)', pressed: 'var(--alpha-black-30)' },
    variants: ['primary', 'secondary', 'ghost'].map((key) => {
      const block = buttonSrc.match(new RegExp(`  ${key}: \\{[\\s\\S]*?\\n  \\},`))[0]
      const field = (state, k) => (block.match(new RegExp(`${state}:\\s*\\{([^}]+)\\}`))?.[1].match(new RegExp(`${k}:\\s*'([^']+)'`)) || [])[1]
      return {
        key,
        label: { primary: 'Primary', secondary: 'Secondary', ghost: 'Text link' }[key],
        bg: field('default', 'bg'),
        text: field('default', 'text'),
        disabledBg: field('disabled', 'bg'),
        disabledText: field('disabled', 'text'),
      }
    }),
  },
}

writeFileSync(join(root, 'src/content/tokens.generated.js'),
  `// GENERATED FILE — do not edit. Run \`npm run tokens\` to regenerate.\n`
  + `// Extracted from tokens.css, landing.css, the icon set and the DS Button,\n`
  + `// scoped to what the live page paints.\n\n`
  + `export const tokenData = ${JSON.stringify(data, null, 2)}\n\nexport default tokenData\n`)

console.log(`token data written: ${scale.length} sizes · ${fixed.length} styles · ${semantic.reduce((n, g) => n + g.items.length, 0)} colours · ${primitives.length} primitives · ${icons.length} icons · ${iconSizes.length} icon sizes`)
