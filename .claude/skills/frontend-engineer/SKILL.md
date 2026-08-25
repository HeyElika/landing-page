---
name: frontend-engineer
description: Build and modify Billease landing pages in this repo — add a product page, add or change a section type, adjust layout and styling within the design system. Use when asked to add a page, add a section, change the layout, fix a styling bug, or implement a design in this project.
---

# Frontend engineer — Billease landing pages

This repo is a content-driven landing page template. The layout is fixed; pages are data. Most requests here are content changes, and reaching for a component or a stylesheet usually means the request was misread.

## Decide what kind of change this is

Work down this list and stop at the first match.

1. **New page, or new copy for a page.** Edit a file in `src/content/products/`. Touch nothing else.
2. **A section exists but needs a different arrangement.** Check the section's props first. `hero` has `layout`, `features` has `columns` and `variant`, most have `background`.
3. **A genuinely new kind of section.** Add a component and register it. See below.
4. **A token needs to change.** It does not. Tokens mirror Figma. Raise it against the design system instead.

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

**Tokens.** Every colour, spacing, radius and font size resolves to a variable from `tokens.css`. No hex, no bare pixel numbers for spacing. Element sizes use `--control-lg`, `--control-md`, `--logo-h`, `--store-badge-h`.

**tokens.css is read-only here.** It is copied verbatim from `Billease-app/src/index.css`. If a token is wrong, fix it in the design system and re-copy the file. Never patch it locally, or this repo silently forks from Figma.

**landing.css holds two things only:** the display type scale above `--text-3xl`, because the product scale stops at 32px for a phone screen, and page rhythm such as container width, gutters and band padding. Everything else in it resolves to a token. Do not grow it into a second design system.

**Icons.** `BilleaseIcon` with a name from `src/assets/icons/index.js`. Never an inline SVG path. An unknown name renders a visible dashed label instead of failing, so a typo shows up on the page. If the icon does not exist, use the closest one and say so.

**Components read content from props.** No fetching, no content literals inside a section component. If a section hardcodes a string, that string cannot be changed by whoever updates the copy.

**Images degrade gracefully.** Every media slot takes `{ src, alt, ratio, label }`. A `null` src renders a labelled placeholder at the right ratio. Never let a missing asset collapse the layout.

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

Check for drift after any styling work:

```bash
grep -rn "#[0-9A-Fa-f]\{6\}" src/components src/content
grep -rnE "(width|height): *[0-9]+,?$" src/components
```

Both should return nothing.

## Deploying

`main` is the production branch. This project does **not** currently auto-deploy on push, because the Vercel GitHub App is not authorized for the `HeyElika` account. Until someone connects it in the project's Settings → Git:

```bash
vercel deploy --prod --yes
```

Re-check whether the git connection exists before assuming either flow. `vercel.json` rewrites all paths to `index.html`, so client-side routes survive a refresh.
