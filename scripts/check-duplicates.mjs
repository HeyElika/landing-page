/**
 * Is a new section a copy of one we already have?
 *
 * The registry and catalogue checks stop a section appearing out of nowhere,
 * but they cannot tell whether it duplicates something. The realistic failure
 * is not an invented layout — it is a copy: someone (me, usually) needs a
 * variation, copies the nearest component, changes three lines and registers
 * the result, and now two files do one job.
 *
 * This compares every pair of section components by what they are made of:
 * the JSX tags, class names and props each one uses. Two files doing genuinely
 * different jobs share the layout vocabulary and little else. A copy shares
 * almost everything.
 *
 * The threshold is deliberately loose. It is not trying to catch a component
 * that resembles another; it is trying to catch one that IS another.
 */
import { readFileSync, readdirSync } from 'node:fs'

const DIR = new URL('../src/components/sections/', import.meta.url)
const SKIP = ['index.js', 'columns.js', 'NavBar.jsx', 'Footer.jsx']
const THRESHOLD = 0.82

const files = readdirSync(DIR).filter((f) => f.endsWith('.jsx') && !SKIP.includes(f))

/** What a component is made of, ignoring the words it happens to contain. */
const fingerprint = (src) => new Set([
  ...[...src.matchAll(/<([A-Za-z][\w.]*)/g)].map((m) => `tag:${m[1]}`),
  ...[...src.matchAll(/className=(?:"([^"]+)"|\{\[?'([^']+)')/g)].map((m) => `class:${m[1] ?? m[2]}`),
  ...[...src.matchAll(/\b([a-z][a-zA-Z]+)=\{/g)].map((m) => `prop:${m[1]}`),
  ...[...src.matchAll(/'(c-[a-z-]+|l-[a-z-]+)/g)].map((m) => `sel:${m[1]}`),
])

const jaccard = (a, b) => {
  const shared = [...a].filter((x) => b.has(x)).length
  return shared / (a.size + b.size - shared)
}

const prints = files.map((f) => [f.replace('.jsx', ''), fingerprint(readFileSync(new URL(f, DIR), 'utf8'))])

let failed = 0
const pairs = []
for (let i = 0; i < prints.length; i++) {
  for (let j = i + 1; j < prints.length; j++) {
    const score = jaccard(prints[i][1], prints[j][1])
    pairs.push([score, prints[i][0], prints[j][0]])
    if (score >= THRESHOLD) {
      console.error(`  ${prints[i][0]} and ${prints[j][0]} are ${Math.round(score * 100)}% the same component.`)
      console.error('    If one is a variation of the other, it belongs as a prop on the original.')
      failed++
    }
  }
}

if (failed) {
  console.error(`\nduplicate check failed: ${failed} pair(s) too alike\n`)
  process.exit(1)
}
const [top, a, b] = pairs.sort((x, y) => y[0] - x[0])[0]
console.log(`duplicate check passed: ${files.length} sections, closest pair ${a}/${b} at ${Math.round(top * 100)}%`)
