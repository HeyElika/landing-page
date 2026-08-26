---
name: frontend-engineer
description: Build and modify Billease landing pages in this repo — add a product page, add or change a section type, adjust layout and styling within the design system. Use when asked to add a page, add a section, change the layout, fix a styling bug, or implement a design in this project.
---

# Frontend engineer — Billease landing pages

**Read `DESIGN-RULES.md` before changing any UI.** It is the authoritative
guardrail and it overrides anything below that conflicts with it. The Billease
component library overrides both.

This repo is a content-driven landing page template. The layout is fixed; pages are data. Most requests here are content changes, and reaching for a component or a stylesheet usually means the request was misread.

## Decide what kind of change this is

Work down this list and stop at the first match.

1. **New page, or new copy for a page.** Edit a file in `src/content/products/`. Touch nothing else.
2. **A section exists but needs a different arrangement.** Check the section's props first. `hero` has `layout`, `features` has `columns` and `variant`, most have `background`.
3. **A genuinely new kind of section.** Add a component and register it. See below.
4. **A token needs to change.** Change it in Figma, re-export the variables, then run `npm run tokens`. Never edit `tokens.css`.

**Financial content is never yours to write.** Fees, interest, limits, eligibility, timings, merchant acceptance and security claims must come from Product, Risk or Legal. If a figure is not confirmed, mark it `CONTENT DEPENDENCY` and leave it visible. See DESIGN-RULES.md section 16.

## Architecture

```
src/content/products/*.js      one file per product page
src/content/index.js           the page list; first entry renders at /
src/content/brand.js           shared brand, nav, footer
src/LandingPage.jsx            maps each section object to a component
src/components/sections/       section components, fixed layout
src/components/sections/index.js   the type registry
src/components/ui/             shared primitives
src/styles/tokens.css          design system, copied from Figma, never edited here
src/styles/landing.css         marketing layer only
```

Sections render in array order. Reordering a page means moving an object in the array.

## Rules

**Tokens.** Every colour, spacing, radius and border width resolves to a variable from `tokens.css`. Prefer semantic tokens over primitives: `--bg-primary`, not `--color-red-500`.

**tokens.css is generated.** It is built from `tokens/variables.json`, the Figma variables export. Never hand-edit it. To change a token, change it in Figma, re-export, replace `tokens/variables.json` and run `npm run tokens`.

**Type comes from classes, never from `font-size` in a component.**

- Section and hero headings use the display scale in `landing.css`: `.display-lg` (hero, 32→72), `.display-md` (section, 24→48), `.display-sm` (subsection, 20→32). These grow with the viewport, from the token value at 360px to the maximum at 1280px.
- The typeface is Overused Grotesk, self-hosted and applied by overriding `--ds-font-family` once in `landing.css`. Never edit `tokens.css` to change it.
- Everything else uses the generated token classes: `.heading-md-semibold`, `.heading-sm-semibold`, `.body-{lg,md,sm,xs,xxs}-{regular,semibold}`, `.link-md`, `.link-sm`, `.label-xs`.

The display scale is an approved amendment to DESIGN-RULES.md section 3, valid for landing pages only. Do not widen it further, and do not copy it into product UI. `npm run check` verifies each step still resolves to its token at 360px.

**Buttons come from the library.** `src/components/ds/Button.jsx` is the Figma Button (node `16:182`). Use it through `src/components/ui/Cta.jsx`. Do not build another button, and do not restyle this one.

**Section rhythm.** Bands run 48px on mobile to 112px on desktop, and `--lg`
bands 56 to 144. Calibrated against what comparable pages ship: Klarna 120px,
Atome 80-96px, Salmon 56-96px. Sections that sit too close read as stacked. All
values are sums of `--space-*` tokens and `npm run check` fails on a raw px.

**Colour discipline.** Brand red is for primary actions and brand emphasis
only. It is never an icon colour and never a chip background — `Badge` mirrors
the Figma `badge/item` set, whose only red variant is a solid fill with white
text. `IconTile` has no red tone at all.

**One content box.** `.l-band` puts the page gutter outside `.l-container`.
Anything that sets its own horizontal padding on an `.l-container` drifts by a
gutter once the viewport passes the container width. `npm run check` fails on
it.

**landing.css is layout only:** page width, gutters, band rhythm, grids, and compositions for patterns the library does not have (card, chip, accordion, icon container). It declares four layout constants, documented in the file. Do not grow it into a second design system.

**Icons are Solar Linear, and only Solar Linear.** `src/assets/icons/icons.generated.js` is built by `npm run icons` from the `@iconify-json/solar` package. To add an icon, add a semantic name to the `MAP` in `scripts/build-icons.mjs` and rerun. The build fails if the mapped name is not a `-linear` variant, which is what keeps one icon family on the page. Never hand-write or redraw a path.

**Components read content from props.** No fetching, no content literals inside a section component. If a section hardcodes a string, that string cannot be changed by whoever updates the copy.

**Images degrade gracefully.** Every media slot takes `{ src, alt, ratio, label }`. A `null` src renders a labelled placeholder at the right ratio. Never let a missing asset collapse the layout.

## The narrative

Sections follow DESIGN-RULES.md section 10, in this order:

1. `hero` — what this is, one action
2. `features` — key benefits, three or four at most
3. `useCases` — where and how it can be used
4. `steps` — how activation or sign-up works
6. `panel` or `spotlight` — one or two depth moments on the product itself.
   `panel` is contained (tinted rounded container, copy beside an image) and
   breaks up a long page; `spotlight` is the same content without the box.
7. `pricing` — terms, where cost is a real question
8. `conditions` — important things to know, **always before the FAQ**
9. `security` — security and control
10. `faq` — genuine conversion blockers
11. `ctaBand` — repeat the single primary action

One primary action per page, worded identically everywhere it appears, in
exactly three places: sticky header, hero, closing band. `stickyCta` on the
page object adds a mobile-only bar with the same action once the hero scrolls
away; it is not a fourth CTA. Never put the primary action inside a mid-page
section — that is CTA overload.

An activation or decision page is not a marketing page. Prioritise clarity
over persuasion, and cut any section that does not answer a real blocker.

Do not add sections to pad a page. There is no logo strip or testimonial wall
on purpose: rule 2 warns against generic marketing furniture.

## Adding a product page

1. Copy `src/content/products/_template.js`, rename it, set `slug`, `name`, `meta`
2. Delete sections the product does not need, reorder the rest
3. Register it in `src/content/index.js`
4. Check it at `/your-slug`

## Adding a section type

1. Build it in `src/components/sections/`, taking content as props
2. Register it in `src/components/sections/index.js`
3. Add a stub to `_template.js` and a row to the README table

Use the existing classes: `l-band`, `l-container`, `l-stack`, `l-grid`, `t-h2`, `t-body`, `c-card`, `c-btn`. A new section that needs new colours or new type sizes is a design question, not an implementation one, so stop and raise it.

Accept `background` and pass through `eyebrow`, `title`, `description` to `SectionHead` for consistency with every other section.

## Verifying

Always, before reporting done:

```bash
npm run build && npm run lint
```

`npm run lint` runs ESLint and then the token checker, which fails the build if
any file references a token that does not exist, reintroduces a raw hex colour,
or hardcodes a font size. That check is the guardrail; do not skip it.

To confirm every route renders and no icon name is broken, without a browser:

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
  for (const p of ['/', '/cash-loan', '/_pages', '/nope']) {
    const html = m.render(p)
    console.log(p, {
      sections: (html.match(/<section/g)||[]).length,
      h1: (html.match(/<h1/g)||[]).length,
      missingIcons: (html.match(/border: 1px dashed/g)||[]).length,
      unknown: /Unknown section type/.test(html),
    })
  }
})"
rm -rf .ssr-tmp src/ssr-check.jsx
```

This proves nothing crashes. It proves nothing about how the page looks. Say which one you checked.

Drift is caught automatically by `npm run check` (also part of `npm run lint`).

## Deploying

`main` is the production branch. This project does **not** currently auto-deploy on push, because the Vercel GitHub App is not authorized for the `HeyElika` account. Until someone connects it in the project's Settings → Git:

```bash
vercel deploy --prod --yes
```

Re-check whether the git connection exists before assuming either flow. `vercel.json` rewrites all paths to `index.html`, so client-side routes survive a refresh.
