/**
 * Verifies the marketing display scale still resolves to real token sizes at
 * mobile width. The extension past the token scale is approved only on the
 * condition that a phone renders exact token values, so this asserts it.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const css = readFileSync(join(root, 'src/styles/landing.css'), 'utf8')

const TOKENS = { '--text-xl': 20, '--text-2xl': 24, '--text-3xl': 32 }
const EXPECT = {
  '--display-lg': { token: '--text-3xl', max: 56 },
  '--display-md': { token: '--text-2xl', max: 40 },
  '--display-sm': { token: '--text-xl', max: 28 },
}

const at = (rem, vw, w) => rem * 16 + (vw * w) / 100
let failed = 0

for (const [name, { token, max }] of Object.entries(EXPECT)) {
  const re = new RegExp(`${name}:\\s*clamp\\(var\\((--[a-z0-9-]+)\\),\\s*([\\d.]+)rem \\+ ([\\d.]+)vw,\\s*(\\d+)px\\)`)
  const m = css.match(re)
  if (!m) { console.error(`  ${name}: not found or unexpected form`); failed++; continue }
  const [, minToken, rem, vw, maxPx] = m
  const lo = TOKENS[token]
  const problems = []
  if (minToken !== token) problems.push(`min should be var(${token}), got var(${minToken})`)
  if (Number(maxPx) !== max) problems.push(`max should be ${max}px, got ${maxPx}px`)
  const at360 = at(Number(rem), Number(vw), 360)
  const at1280 = at(Number(rem), Number(vw), 1280)
  if (Math.abs(at360 - lo) > 0.5) problems.push(`at 360px resolves to ${at360.toFixed(1)}px, should be the token ${lo}px`)
  if (Math.abs(at1280 - max) > 0.5) problems.push(`at 1280px resolves to ${at1280.toFixed(1)}px, should be ${max}px`)
  if (problems.length) { problems.forEach((p) => console.error(`  ${name}: ${p}`)); failed++ }
  else console.log(`  ${name}: ${lo}px @360 -> ${at(Number(rem), Number(vw), 768).toFixed(0)}px @768 -> ${max}px @1280+`)
}

if (failed) { console.error(`\ntype scale check failed: ${failed} issue(s)`); process.exit(1) }
console.log('type scale check passed')
