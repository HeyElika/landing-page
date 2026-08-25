/**
 * Fails if any source file references a CSS custom property that tokens.css
 * does not define, or reintroduces a raw hex colour or a bare pixel font size.
 * This is what stops the repo drifting away from Figma.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const tokensCss = readFileSync(join(root, 'src/styles/tokens.css'), 'utf8')
const landingCss = readFileSync(join(root, 'src/styles/landing.css'), 'utf8')

const defined = new Set([...tokensCss.matchAll(/^\s*(--[a-z0-9-]+):/gim)].map((m) => m[1]))
// landing.css may define its own layout-only variables; they are declared there.
for (const m of landingCss.matchAll(/^\s*(--[a-z0-9-]+):/gim)) defined.add(m[1])

/** Comments document Figma reads (e.g. "#E7161A -> var(--bg-primary)"); they are not styling. */
function stripComments(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
}

const files = []
;(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) walk(p)
    else if (['.jsx', '.js', '.css'].includes(extname(p))) files.push(p)
  }
})(join(root, 'src'))

let failed = 0
const report = (file, msg) => { console.error(`  ${file.replace(root + '/', '')}: ${msg}`); failed++ }

for (const file of files) {
  if (file.endsWith('tokens.css')) continue
  const text = stripComments(readFileSync(file, 'utf8'))
  const isIcons = file.includes('assets/icons')

  // Custom properties a file sets itself (inline style objects, local scopes).
  const localVars = new Set([...text.matchAll(/['"]?(--[a-z0-9-]+)['"]?\s*:/gi)].map((m) => m[1]))

  // var(--x, fallback) is an intentional escape hatch for a value passed in
  // from a style prop; only bare var(--x) must resolve to a real token.
  for (const m of text.matchAll(/var\((--[a-z0-9-]+)\s*([,)])/gi)) {
    if (m[2] === ',') continue
    if (!defined.has(m[1]) && !localVars.has(m[1])) report(file, `undefined token ${m[1]}`)
  }
  if (!isIcons) {
    for (const m of text.matchAll(/#[0-9a-f]{3,8}\b/gi)) {
      if (!/#[0-9a-f]/.test(m[0])) continue
      report(file, `raw hex colour ${m[0]}`)
    }
    for (const m of text.matchAll(/font-size:\s*(\d+)px/gi)) {
      report(file, `hardcoded font-size ${m[1]}px, use a type style class`)
    }
  }
}

if (failed) {
  console.error(`\ntoken check failed: ${failed} issue(s)`)
  process.exit(1)
}
console.log(`token check passed: ${defined.size} tokens defined, ${files.length} files scanned`)
