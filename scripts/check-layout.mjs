/**
 * Layout discipline.
 *
 * Everything on the page must share one content box. `.l-band` puts the page
 * gutter OUTSIDE `.l-container`, so anything that puts padding INSIDE the
 * container ends up offset by one gutter once the viewport passes the
 * container's max width — the nav did exactly that and sat 32px right of every
 * section above 1264px.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const files = []
;(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) walk(p)
    else if (extname(p) === '.jsx') files.push(p)
  }
})(join(root, 'src'))

let failed = 0
for (const file of files) {
  const text = readFileSync(file, 'utf8')
  const rel = file.replace(root + '/', '')

  // An element carrying l-container must not set its own horizontal padding.
  for (const m of text.matchAll(/className="[^"]*\bl-container\b[^"]*"[\s\S]{0,400}?\/?>/g)) {
    const chunk = m[0]
    if (/padding(Inline|Left|Right)\s*:/.test(chunk) || /padding:\s*'[^']*var\(--page-gutter\)/.test(chunk)) {
      console.error(`  ${rel}: an .l-container sets its own horizontal padding — put the gutter on the parent instead`)
      failed++
    }
  }

  // Sections should be full-bleed bands, not containers pretending to be one.
  for (const m of text.matchAll(/<section\s+className="([^"]*)"/g)) {
    if (!m[1].includes('l-band')) {
      console.error(`  ${rel}: <section> without l-band — every section is a band`)
      failed++
    }
  }
}

if (failed) { console.error(`\nlayout check failed: ${failed} issue(s)`); process.exit(1) }
console.log(`layout check passed: ${files.length} components share one content box`)
