/**
 * The promises each section makes to content written against it.
 *
 * `check-sections.mjs` renders today's pages and today's catalogue, so it
 * proves a change did not break what exists right now. It cannot prove a
 * change did not break a shape that exists in a content file nobody opened
 * this month — an FAQ still passing `items`, a hero whose title is a plain
 * string rather than two lines, a page using `type: 'features'` from before
 * the rename.
 *
 * Those shapes are the contract. Each one is listed here with the version it
 * was promised in, and this file is what makes removing one deliberate rather
 * than accidental: the build fails, and whoever wants it gone has to delete
 * the line and say why in the changelog.
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { SECTIONS } from '../src/components/sections/index.js'

const CONTRACTS = [
  // ── Shapes the current catalogue does not exercise ────────────────────
  { since: '1.0', what: 'faq: a flat items array', type: 'faq',
    props: { title: 'Q', items: [{ question: 'A question?', answer: 'An answer.' }] } },
  { since: '1.0', what: 'faq: an answer as a string', type: 'faq',
    props: { items: [{ question: 'Q?', answer: 'One paragraph.' }] } },
  { since: '1.2', what: 'faq: an answer as an array of paragraphs', type: 'faq',
    props: { items: [{ question: 'Q?', answer: ['First.', 'Second.'] }] } },
  { since: '1.0', what: 'faq: grouped items', type: 'faq',
    props: { groups: [{ label: 'Group', items: [{ question: 'Q?', answer: 'A.' }] }] } },
  { since: '1.0', what: 'faq: a footer link', type: 'faq',
    props: { items: [{ question: 'Q?', answer: 'A.' }], footerLink: { text: 'More?', label: 'Help', href: '#' } } },

  { since: '1.0', what: 'hero: a title as a plain string', type: 'hero',
    props: { title: 'One line', description: 'x', ctas: [{ label: 'Go', href: '#' }] } },
  { since: '1.1', what: 'hero: a title as authored lines', type: 'hero',
    props: { title: ['One', 'Two'], ctas: [{ label: 'Go', href: '#' }] } },
  { since: '1.3', what: 'hero: appLink with an href renders a link', type: 'hero',
    props: { title: 'x', appLink: { text: 'No app?', label: 'Get it', href: '#' } },
    expect: (html) => /<a[^>]*href="#"[^>]*>Get it</.test(html) },
  { since: '1.3', what: 'hero: appLink without an href renders plain text', type: 'hero',
    props: { title: 'x', appLink: { text: 'No app?', label: 'Get it' } },
    expect: (html) => !/<a[^>]*>Get it</.test(html) },
  { since: '1.0', what: 'hero: centred layout', type: 'hero', props: { layout: 'centered', title: 'x' } },

  { since: '1.0', what: 'benefits: icon items', type: 'benefits',
    props: { title: 'x', items: [{ icon: 'wallet', title: 'A', description: 'b' }] } },
  { since: '1.1', what: 'benefits: media items', type: 'benefits',
    props: { label: 'x', items: [{ media: { src: null, ratio: '2 / 3' }, title: 'A', description: 'b' }] } },

  { since: '1.2', what: 'mediaPoints: reverse puts the media first', type: 'mediaPoints',
    props: { title: 'x', reverse: true, media: { src: null }, items: [{ icon: 'lock', title: 'A' }] } },
  { since: '1.2', what: 'appDownload: tone and reverse', type: 'appDownload',
    props: { title: 'x', tone: 'dark', reverse: true, media: { src: null }, apps: [{ name: 'App Store', href: '#' }] } },
  { since: '1.3', what: 'statement: two or three lines', type: 'statement',
    props: { lines: ['One', 'Two'], ctas: [{ label: 'Go', href: '#' }] } },

  // ── Names that older content files still use ──────────────────────────
  { since: '1.0', what: "alias: type 'features' still resolves", type: 'features',
    props: { title: 'x', items: [{ icon: 'wallet', title: 'A' }] } },
  { since: '1.0', what: "alias: type 'security' still resolves", type: 'security',
    props: { title: 'x', media: { src: null }, items: [{ icon: 'lock', title: 'A' }] } },
  { since: '1.0', what: "alias: type 'ctaBand' still resolves", type: 'ctaBand',
    props: { title: 'x', ctas: [{ label: 'Go', href: '#' }] } },
  { since: '1.0', what: "alias: type 'spotlight' still resolves", type: 'spotlight',
    props: { title: 'x', rows: [{ title: 'A', media: { src: null } }] } },
]

let failed = 0
for (const c of CONTRACTS) {
  const Component = SECTIONS[c.type]
  if (!Component) {
    console.error(`  [${c.since}] ${c.what} — type '${c.type}' no longer exists`)
    failed++
    continue
  }
  try {
    const html = renderToStaticMarkup(createElement(Component, c.props))
    if (html.length < 80) { console.error(`  [${c.since}] ${c.what} — renders empty`); failed++ }
    else if (c.expect && !c.expect(html)) { console.error(`  [${c.since}] ${c.what} — no longer behaves as promised`); failed++ }
  } catch (e) {
    console.error(`  [${c.since}] ${c.what} — threw: ${e.message}`)
    failed++
  }
}

if (failed) {
  console.error(`\ncontract check failed: ${failed} promise(s) broken.`)
  console.error('Either restore the behaviour, or delete the contract line and record the break in CHANGELOG.md.\n')
  process.exit(1)
}
console.log(`contract check passed: ${CONTRACTS.length} promises kept`)
