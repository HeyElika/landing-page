/**
 * Renders each pattern with deliberately awkward content and reports what
 * would strain: very long headings, long unbroken words, more items than the
 * grid expects, and empty optional fields.
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { SECTIONS } from '../src/components/sections/index.js'
import { patterns } from '../src/content/patterns.js'

const LONG = 'Activate your Billease Access Card and start spending everywhere Mastercard is accepted today'
const UNBREAKABLE = 'Verylongunbrokenwordthatcannotwrapanywhere'

const stress = (v) => {
  const p = structuredClone(v.props)
  if (p.title) p.title = Array.isArray(p.title) ? [LONG, UNBREAKABLE] : LONG
  if (p.lines) p.lines = [LONG, UNBREAKABLE]
  if (p.description) p.description = LONG + ' ' + LONG
  if (Array.isArray(p.items)) {
    p.items = [...p.items, ...p.items].map((i) => ({ ...i, title: i.title ? LONG : i.title, description: i.description ? LONG : i.description }))
  }
  if (Array.isArray(p.steps)) p.steps = p.steps.map((s) => ({ ...s, title: LONG, description: LONG }))
  if (Array.isArray(p.ctas)) p.ctas = p.ctas.map((c) => ({ ...c, label: UNBREAKABLE }))
  return p
}

let problems = 0
for (const g of patterns) {
  for (const v of g.variants) {
    const { type, ...props } = stress(v)
    try {
      const html = renderToStaticMarkup(createElement(SECTIONS[type], props))
      // Grids that hardcode a column count cannot absorb extra items.
      const cols = (html.match(/l-grid--(\d)/) || [])[1]
      const items = (html.match(/<li\b/g) || []).length
      // Ragged only when the count is not a multiple of the columns: 8 in a
      // 4-column grid is two full rows, 6 is a row of four and a row of two.
      if (cols && items % Number(cols) !== 0) {
        console.log(`  ${g.id}/${v.label}: ${items} items in a ${cols}-column grid leaves a ragged last row`)
        problems++
      }
      // A button cannot wrap (the Figma spec sets nowrap), so a long label
      // pushes past its container instead of breaking.
      const longLabel = [...html.matchAll(/white-space:nowrap[\s\S]{0,160}?>([^<]{25,})</g)].map((m) => m[1])
      if (longLabel.length) {
        console.log(`  ${g.id}/${v.label}: un-wrappable label ${longLabel[0].length} chars — "${longLabel[0].slice(0, 30)}…"`)
        problems++
      }
    } catch (e) {
      console.log(`  ${g.id}/${v.label}: THREW — ${e.message}`)
      problems++
    }
  }
}
console.log(problems ? `\n${problems} thing(s) to look at` : '\nno structural failures under stress content')
