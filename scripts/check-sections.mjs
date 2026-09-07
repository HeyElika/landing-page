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

if (failed) {
  console.error(`\nsection independence check failed: ${failed} issue(s)\n`)
  process.exit(1)
}
console.log(`section independence check passed: ${cases.length} sections, ${(cases.length - 1) * 2} pairings, 2 full orderings`)
