/**
 * Generates src/styles/tokens.css from the Figma variables export in
 * tokens/variables.json.
 *
 * tokens.css is BUILD OUTPUT. Never hand-edit it. To change a token, change it
 * in Figma, re-export the variables, replace tokens/variables.json and run:
 *
 *   npm run tokens
 *
 * Naming: Figma paths map to CSS custom properties predictably, so a designer
 * reading a Figma layer can find the variable without a lookup table.
 *   bg/primary                  -> --bg-primary
 *   text/on-dark subtle         -> --text-on-dark-subtle
 *   color/neutral/neutral 900   -> --color-neutral-900
 *   spacing/400                 -> --space-400
 *   border/radius/radius-full   -> --radius-full
 *   typography/size/lg          -> --text-lg
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const src = JSON.parse(readFileSync(join(root, 'tokens/variables.json'), 'utf8'))

const WEIGHTS = { Bold: 700, SemiBold: 600, Regular: 400 }

const collection = (name) =>
  src.collections.find((c) => c.name === name)?.modes[0]?.variables ?? []

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** Figma variable path -> CSS custom property name. */
function toVar(path) {
  const seg = path.split('/')

  if (seg[0] === 'color') {
    // color/neutral/neutral 900, color/status/success/success 600, color/alphas/alpha-white 70
    const last = kebab(seg[seg.length - 1])
    if (seg[1] === 'alphas') return `--${last}`                       // --alpha-white-70
    if (seg[1] === 'gradient') return `--gradient-${last}`
    const family = kebab(seg[seg.length - 2])
    // "neutral 900" under "neutral" collapses to neutral-900
    return `--color-${last.startsWith(family) ? last : `${family}-${last}`}`
  }

  if (seg[0] === 'spacing') return `--space-${seg[1]}`
  if (seg[0] === 'border' && seg[1] === 'radius') {
    const n = kebab(seg[2]).replace(/^radius-/, '')
    return `--radius-${n}`
  }
  if (seg[0] === 'border' && seg[1] === 'width') return `--border-width-${kebab(seg[2])}`
  if (seg[0] === 'icon' && seg[1] === 'size') return `--icon-size-${kebab(seg[2])}`
  if (seg[0] === 'icon' && seg[1] === 'padding') return `--icon-padding-${kebab(seg[2])}`
  if (seg[0] === 'typography' && seg[1] === 'size') return `--text-${kebab(seg[2])}`
  if (seg[0] === 'typography' && seg[1] === 'weight') return `--font-weight-${kebab(seg[2])}`
  if (seg[0] === 'typography' && seg[1] === 'family') return `--ds-font-family`

  // Semantic: bg/primary, text/on-dark subtle, icon/warning-bold, canvas/default
  return `--${kebab(path.replace(/\//g, '-'))}`
}

const lines = []
const defined = new Set()
const emit = (name, value, comment) => {
  defined.add(name)
  lines.push(`  ${name}: ${value};${comment ? ` /* ${comment} */` : ''}`)
}

lines.push('/* GENERATED FILE — do not edit. Run `npm run tokens` to regenerate. */')
lines.push(`/* Source: tokens/variables.json (Figma export v${src.version}) */`)
lines.push('')
lines.push(':root {')

// ── Primitives ──────────────────────────────────────────────────────────────
lines.push('  /* ── Primitives ── */')
const prims = collection('Primitives')
const elevation = {}

for (const v of prims) {
  if (v.name.startsWith('elevation/')) {
    const [, tier, prop] = v.name.split('/')
    elevation[tier] ??= {}
    elevation[tier][prop.replace(/\s?\d+$/, '').trim()] =
      v.isAlias ? `var(${toVar(v.value.name)})` : v.value
    continue
  }
  const name = toVar(v.name)
  if (v.type === 'color') emit(name, v.isAlias ? `var(${toVar(v.value.name)})` : v.value)
  else if (v.type === 'number') emit(name, `${v.value}px`)
  else if (v.type === 'string') {
    if (v.name.startsWith('typography/weight/')) emit(name, WEIGHTS[v.value] ?? v.value)
    else if (v.name.startsWith('typography/family/')) emit(name, `'${v.value}', sans-serif`)
  }
}

// ── Semantic ────────────────────────────────────────────────────────────────
lines.push('')
lines.push('  /* ── Semantic ── */')
for (const v of collection('Semantic')) {
  emit(toVar(v.name), v.isAlias ? `var(${toVar(v.value.name)})` : v.value)
}

// ── Effects ─────────────────────────────────────────────────────────────────
lines.push('')
lines.push('  /* ── Elevation (Figma Effects) ── */')
for (const v of collection('Effects')) {
  const e = v.value.effects[0]
  const { r, g, b, a } = e.color
  // Figma exports 0-255 channels here, with alpha 0-1.
  const rgba = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`
  emit(`--shadow-${v.name}`, `${e.offset.x}px ${e.offset.y}px ${e.radius}px ${e.spread}px ${rgba}`)
}

lines.push('}')

// ── Typography styles as classes ────────────────────────────────────────────
lines.push('')
lines.push('/* ── Typography styles (Figma text styles) ──────────────────────────────')
lines.push(' * One class per approved style. These are the ONLY type styles allowed.')
lines.push(' * Do not set font-size, font-weight or line-height anywhere else.')
lines.push(' * ──────────────────────────────────────────────────────────────────── */')

const typeClasses = []
for (const v of collection('Typography')) {
  const cls = kebab(v.name.split('/')[1])
  const t = v.value
  typeClasses.push(cls)
  const decl = [
    `  font-family: var(--ds-font-family);`,
    `  font-size: ${t.fontSize}px;`,
    `  font-weight: ${WEIGHTS[t.fontWeight] ?? t.fontWeight};`,
    `  line-height: ${t.lineHeight / 100};`,
  ]
  if (t.letterSpacing) decl.push(`  letter-spacing: ${t.letterSpacing}px;`)
  if (t.textCase === 'SMALL_CAPS_FORCED') decl.push('  font-variant-caps: all-small-caps;')
  if (t.textDecoration === 'UNDERLINE') decl.push('  text-decoration: underline;')
  lines.push('')
  lines.push(`.${cls} {`)
  lines.push(...decl)
  lines.push('}')
}

writeFileSync(join(root, 'src/styles/tokens.css'), lines.join('\n') + '\n')

console.log(`tokens.css written: ${defined.size} custom properties, ${typeClasses.length} type styles`)
console.log('type styles:', typeClasses.join(', '))
