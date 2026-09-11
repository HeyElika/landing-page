/**
 * A sample page assembled from catalogue variants, written as one standalone
 * HTML file.
 *
 * The point is that nothing here is hand-drawn: the sections are rendered by
 * the same components a real page mounts, from the same props the catalogue
 * shows, with the project's own stylesheets inlined. So the file is a true
 * showcase of the patterns rather than an impression of them - if a section
 * changes, this file changes with it on the next build.
 *
 * Composition is the list below. Change it, run `npm run sample`, reload.
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement, Fragment } from 'react'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { SECTIONS, CHROME } from '../src/components/sections/index.js'
import { patterns, chrome } from '../src/content/patterns.js'
import { brand } from '../src/content/brand.js'

const COMPOSITION = [
  ['navbar', 'v3'],
  ['hero', 'v1'],
  ['benefits', 'v2'],
  ['steps', 'v1'],
  ['featureRows', 'v1'],
  ['finalCta', 'v1'],
  ['footer', 'v2'],
]

const groups = [...patterns, ...chrome]
const pick = ([id, version]) => {
  const group = groups.find((g) => g.id === id)
  if (!group) throw new Error(`no pattern named "${id}"`)
  const variant = group.variants.find((v) => v.version === version)
  if (!variant) throw new Error(`${id} has no ${version} — it has ${group.variants.map((v) => v.version).join(', ')}`)
  return { group, variant }
}

const chosen = COMPOSITION.map(pick)
const render = ({ variant }) => {
  const { type, ...props } = variant.props
  const Component = SECTIONS[type] ?? CHROME[type]
  const extra = CHROME[type] ? { brand } : {}
  return createElement(Component, { ...extra, ...props })
}

const isChrome = (c) => Boolean(CHROME[c.variant.props.type])
const header = chosen.find((c) => c.variant.props.type === 'navbar')
const footer = chosen.find((c) => c.variant.props.type === 'footer')
const body = chosen.filter((c) => !isChrome(c))

const markup = renderToStaticMarkup(
  createElement(Fragment, null,
    createElement('a', { className: 'c-skip u-visually-hidden', href: '#main' }, 'Skip to content'),
    header ? render(header) : null,
    createElement('main', { id: 'main' }, body.map((c, i) =>
      createElement('div', { key: i, id: c.group.id }, render(c)))),
    footer ? render(footer) : null,
  ),
)

// The project's own stylesheets, not a copy: tokens first, then the landing
// layer that overrides the typeface and adds the layout tokens.
const css = ['src/styles/tokens.css', 'src/styles/landing.css']
  .map((f) => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8'))
  .join('\n')

const list = chosen.map((c) => `${c.group.name} ${c.variant.version}`).join(' · ')

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Sample page — ${chosen.length} patterns</title>
<meta name="description" content="${list}">
<link rel="preload" href="/fonts/Geist-VF.woff2" as="font" type="font/woff2" crossorigin>
<style>
${css}
</style>
</head>
<body>
${markup}
</body>
</html>
`

// Written as a directory index, not sample.html: the host has cleanUrls on,
// so /sample.html redirects to /sample, and /sample only resolves if there is
// an index.html behind it.
mkdirSync(new URL('../public/sample/', import.meta.url), { recursive: true })
writeFileSync(new URL('../public/sample/index.html', import.meta.url), html)
console.log(`sample page written: public/sample/index.html  ->  /sample`)
console.log(`  ${list}`)
console.log(`  ${(html.length / 1024).toFixed(0)} KB, no scripts, stylesheets inlined`)
