/**
 * Does the page use the names the catalogue publishes?
 *
 * Three things can drift apart: the type a page writes in its content file,
 * the key the registry answers to, and the id the catalogue lists. An alias
 * keeps an old page working, which is the point of aliases — but a page still
 * using one is a page written against a name nobody documents any more, and
 * that is worth seeing rather than discovering.
 */
import { SECTIONS, SECTION_ALIASES } from '../src/components/sections/index.js'
import { patterns } from '../src/content/patterns.js'
import { pages } from '../src/content/index.js'

const catalogued = new Set(patterns.map((p) => p.id))
let issues = 0

for (const page of pages) {
  console.log(`\n/${page.slug}`)
  for (const [i, section] of page.sections.entries()) {
    const type = section.type
    const canonical = SECTION_ALIASES[type]
    const registered = Boolean(SECTIONS[type])
    const inCatalogue = catalogued.has(canonical ?? type)

    let note = 'ok'
    if (!registered) { note = 'NOT IN THE REGISTRY'; issues++ }
    else if (canonical) { note = `alias, canonical name is '${canonical}'`; issues++ }
    else if (!inCatalogue) { note = 'not in the catalogue'; issues++ }

    console.log(`  ${String(i + 1).padStart(2)}. ${type.padEnd(14)} ${section.id ? `#${section.id}`.padEnd(16) : ''.padEnd(16)} ${note}`)
  }
}

const used = new Set(pages.flatMap((p) => p.sections.map((s) => s.type)))
const unusedPatterns = [...catalogued].filter((id) => !used.has(id))
console.log(`\ncatalogue entries no page uses: ${unusedPatterns.join(', ') || 'none'}`)
console.log(issues ? `\n${issues} name(s) out of alignment` : '\nevery section name matches the catalogue')
if (issues) process.exit(1)
