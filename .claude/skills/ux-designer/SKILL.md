---
name: ux-designer
description: Review and improve the UX of a Billease landing page in this repo — hierarchy, scannability, the conversion path, accessibility and responsive behaviour. Use when asked to review a page, critique a layout, improve conversion, fix UX issues, check accessibility, or make a page "feel right".
---

# UX designer — Billease landing pages

Review pages in this repo against how people actually read a landing page. Fix what is wrong at the content level first, the layout level second, and the component level only when the first two cannot solve it.

## Before you start

Read `README.md` and the page you are reviewing in `src/content/products/`. The content file is the page. Most UX problems here are content problems wearing a layout costume.

Two constraints that are not negotiable:

- **Tokens only.** Colour, spacing, radius and type come from `src/styles/tokens.css`, which mirrors Figma. Never introduce a hex value, a new spacing number or a new type size. If a fix seems to need one, the fix is wrong.
- **Icons come from the library.** Names in `src/assets/icons/index.js` only. Never write an SVG path.

## What you can and cannot verify

You usually have no browser in this session. Be honest about which of these you actually ran.

Available without a browser:

```bash
npm run build && npm run lint
```

Server-side render every route, which catches crashes, missing sections and bad icon names but tells you nothing about how it looks:

```bash
cat > src/ssr-check.jsx <<'EOF'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
export function render(path) {
  return renderToStaticMarkup(<StaticRouter location={path}><App /></StaticRouter>)
}
EOF
npx vite build --ssr src/ssr-check.jsx --outDir .ssr-tmp
node -e "import('./.ssr-tmp/ssr-check.js').then(m => {
  const html = m.render('/')
  console.log('sections', (html.match(/<section/g)||[]).length)
  console.log('h1', (html.match(/<h1/g)||[]).length)
  console.log('missing icons', (html.match(/border: 1px dashed/g)||[]).length)
  console.log('unknown section', /Unknown section type/.test(html))
})"
rm -rf .ssr-tmp src/ssr-check.jsx
```

If the Chrome extension is connected, look at the real page at 375px, 768px and 1440px before claiming anything visual. If it is not, say so in your report rather than implying you saw the page.

## Review pass

Work in this order. Stop and fix as you go rather than collecting a long list.

### 1. The five second test

Read only the hero. Can you answer what this is, who it is for, and what it costs? If not, no amount of layout work below matters.

- One `<h1>` per page, and it states the benefit, not the feature name
- The subhead adds information rather than restating the headline
- The primary CTA verb matches what actually happens next
- `note` carries the qualifier ("subject to credit assessment") so the headline can stay clean

### 2. The conversion path

- Exactly one primary action per page, repeated in nav, hero and `ctaBand`, with the same wording each time
- Every `href` resolves: `#anchors` match a section `id`, external links are real
- Nothing asks for commitment before the page has earned it

### 3. Scannability

- Section order tells a story: what it is, how it works, why trust it, what it costs, what to do
- No two adjacent sections share a `background` tone, otherwise the bands blur together
- `features` items are parallel in grammar and roughly equal in length
- Body copy sits under about 75 characters per line, which `t-lead` and `t-body` handle when you do not override the width

### 4. Content honesty

Landing pages for a lending product carry legal weight.

- Placeholder legal text in `src/content/brand.js` must be replaced before launch, never paraphrased by you
- The pricing `note` is a regulatory disclosure. Flag it, do not write it
- No invented statistics, testimonials or partner names in anything shipping

### 5. Accessibility

- Colour is never the only signal
- Every image has meaningful `alt`, or `alt=""` when decorative
- Interactive elements are `<button>` or `<a>`, never a styled `<div>`
- Focus is visible, which `:focus-visible` in `landing.css` provides, so do not remove outlines
- Touch targets at least 44px, and `--control-md` is 40px so check anything using it on mobile
- Heading levels descend without skipping

### 6. Responsive

- Nothing scrolls horizontally at 375px
- The hero media does not push the CTA below the fold on mobile
- In `spotlight`, copy always precedes media on small screens regardless of `reverse`
- Grids collapse to one column and stay readable

## Reporting

Give the finding, the evidence, and the fix as a content change where possible:

> **Hero headline states a feature, not a benefit.** `pay-later.js:24` reads "Four instalment options available". A reader cannot tell what they get. Change to what they walk away with.

Separate what you verified from what you inferred. If you did not see the page, say "not visually verified".
