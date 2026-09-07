/**
 * The type scale must resolve to whole pixels at every breakpoint.
 *
 * This replaced an earlier check that verified a fluid `clamp()` hit its
 * endpoints. Hitting the endpoints was never the problem: everything between
 * them was fractional — 32.8px at a 390 phone, 42.6 at a 768 tablet, 46.1 at
 * 900 — so no size in the design file matched what shipped and headlines sat
 * on subpixel boundaries.
 *
 * Now the display steps are t-shirt sizes that step at breakpoints, and this
 * checks exactly that: no fluid maths, every value a scale token, every scale
 * token a whole number of pixels.
 */
import { readFileSync } from 'node:fs'

const landing = readFileSync(new URL('../src/styles/landing.css', import.meta.url), 'utf8')
const tokens = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8')

const declared = (css) => Object.fromEntries(
  [...css.matchAll(/^\s{2,4}(--[a-z0-9-]+):\s*([^;]+);/gm)].map((m) => [m[1], m[2].trim()]),
)
const all = { ...declared(tokens), ...declared(landing) }

const resolve = (value, depth = 0) => {
  const m = value?.match(/^var\((--[a-z0-9-]+)\)/)
  return !m || depth > 6 ? value : resolve(all[m[1]], depth + 1)
}

let failed = 0
const fail = (msg) => { console.error(`  ${msg}`); failed++ }

// 1. Every --font-size-* is a whole number of pixels.
const scale = Object.keys(all).filter((k) => k.startsWith('--font-size-'))
if (!scale.length) fail('no --font-size-* scale found')
for (const name of scale) {
  const px = resolve(all[name])
  if (!/^\d+px$/.test(px || '')) fail(`${name} resolves to "${px}", not a whole pixel value`)
}

// 2. No display step uses fluid maths.
for (const [name, value] of Object.entries(all)) {
  if (!name.startsWith('--display-')) continue
  if (/clamp\(|vw|calc\(/.test(value)) fail(`${name} uses fluid maths: ${value}`)
  if (!value.startsWith('var(--font-size-')) fail(`${name} is "${value}", not a --font-size-* token`)
}

// 3. Every display step is defined at each tier, so none inherits by accident.
for (const step of ['--display-sm', '--display-md', '--display-lg', '--display-xl']) {
  const tiers = [...landing.matchAll(new RegExp(`${step}:`, 'g'))].length
  if (tiers < 3) fail(`${step} is set at ${tiers} tier(s); expected phone, tablet and desktop`)
}

if (failed) {
  console.error(`\ntype scale check failed: ${failed} issue(s)\n`)
  process.exit(1)
}
console.log(`type scale check passed: ${scale.length} sizes, all whole pixels, no fluid steps`)
