/**
 * Section independence.
 *
 * Every section must survive being added, removed or reordered. A section that
 * only looks right because of what happens to sit above it is not a reusable
 * pattern, it is a coincidence.
 *
 * This renders each section alone, each adjacent pair in both orders, and the
 * whole page reversed, then asserts three things:
 *
 *   1. It renders at all — no dependence on a neighbour existing.
 *   2. It carries its own vertical padding, so removing what sat above it
 *      cannot collapse the gap.
 *   3. It shares the page's content box, so its horizontal alignment does not
 *      come from a sibling.
 */
import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { SECTIONS } from '../src/components/sections/index.js'
import { patterns } from '../src/content/patterns.js'

const cases = patterns.flatMap((g) => g.variants.map((v) => ({ id: `${g.id}/${v.label}`, props: v.props })))

const render = (list) => renderToStaticMarkup(
  createElement('div', null, list.map((c, i) => {
    const { type, ...props } = c.props
    return createElement(SECTIONS[type], { key: i, ...props })
  })),
)

let failed = 0
const fail = (msg) => { console.error(`  ${msg}`); failed++ }

// 1. Alone.
for (const c of cases) {
  const html = render([c])
  if (html.length < 200) fail(`${c.id}: renders empty on its own`)
  if (!/l-band|c-statement|<footer/.test(html)) fail(`${c.id}: no band wrapper, so it carries no vertical padding of its own`)
  if (!/l-container/.test(html)) fail(`${c.id}: no container, so its horizontal alignment comes from elsewhere`)
}

// 2. Every adjacent pair, both ways round.
for (let i = 0; i < cases.length - 1; i++) {
  const a = cases[i], b = cases[i + 1]
  for (const pair of [[a, b], [b, a]]) {
    const html = render(pair)
    if (html.length < 400) fail(`${pair[0].id} + ${pair[1].id}: pair renders empty`)
  }
}

// 3. The whole set, forwards and reversed.
for (const [label, list] of [['in order', cases], ['reversed', [...cases].reverse()]]) {
  const html = render(list)
  const bands = (html.match(/l-band/g) || []).length
  if (bands < cases.length) fail(`${label}: ${bands} bands for ${cases.length} sections`)
}

// 4. Every section carries its own boundary.
//
// Two sections of the same tone need something that says where one ends. A
// tint gets a hairline (rule 5). White gets nothing, because a rule between
// every pair of white sections would read as a table — so a white section has
// to bring its own: a heading, or a visual of its own weight.
//
// This is the check that would have caught the case by hand: a section with
// neither, sitting between two others, merges into whatever is around it.
const ANCHORS = /c-media|c-placeholder|c-feature\b|c-statement|c-appcta|c-footer|c-security__icon|c-steps-split__num/
for (const c of cases) {
  const html = render([c])
  // h1/h2 only: a section heading. Card and item titles are h3, and a row of
  // those does not tell a reader where the section began.
  const hasHeading = /<h[12][\s>]/.test(html)
  const hasAnchor = ANCHORS.test(html)
  if (!hasHeading && !hasAnchor) {
    fail(`${c.id}: no heading and no visual of its own, so it has no boundary against a neighbour of the same tone`)
  }
}

// 5. A section's own heading level is h2, so the page outline never jumps.
//
// A benefits row with no visible heading rendered card titles as h3 directly
// under the page h1 — a skipped level for anyone navigating by heading. The
// fix was a visually hidden h2; this keeps it fixed.
for (const c of cases) {
  const html = render([c])
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]))
  if (!levels.length) continue
  if (Math.min(...levels) > 2) {
    fail(`${c.id}: starts at h${Math.min(...levels)}; a section's own heading should be h2`)
  }
}

// 6. Same-tone adjacency has a boundary rule, so any ordering stays legible.
const css = readFileSync(new URL('../src/styles/landing.css', import.meta.url), 'utf8')
for (const tone of ['subtle', 'sunken', 'dark', 'brand']) {
  const rule = new RegExp(`\\[data-reveal\\]:has\\(> \\.l-band--${tone}\\) \\+ \\[data-reveal\\]:has\\(> \\.l-band--${tone}\\)`)
  if (!rule.test(css)) fail(`no boundary rule for two adjacent .l-band--${tone} sections`)
}

if (failed) {
  console.error(`\nsection independence check failed: ${failed} issue(s)\n`)
  process.exit(1)
}
console.log(`section independence check passed: ${cases.length} sections, ${(cases.length - 1) * 2} pairings, 2 full orderings, 4 tone-adjacency rules`)
