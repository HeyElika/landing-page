# Billease landing page template

A content-driven landing page template in the Billease visual language. The layout, spacing, colour and typography are fixed. Launching a new product page means writing one content file, not writing CSS.

**`DESIGN-RULES.md` is the authoritative guardrail for this repo.** Read it before changing any UI. Where it conflicts with anything here, it wins; where the Billease component library conflicts with it, the library wins.

Built with React 19, Vite and React Router. No CSS framework, no component library, no build steps beyond Vite.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run lint
npm run preview  # preview the production build
```

## How it works

One product equals one file in `src/content/products/`. That file exports an object describing the page, and `LandingPage.jsx` turns it into the rendered page. Section components read their content from that object and nothing else.

```
src/content/products/pay-later.js   ← the copy for one product
        ↓
src/content/index.js                ← the list of pages in this project
        ↓
src/LandingPage.jsx                 ← maps each section object to a component
        ↓
src/components/sections/*.jsx       ← fixed layout, token-driven styling
```

Routes:

| Path | Renders |
|---|---|
| `/` | the first page in `src/content/index.js` |
| `/:slug` | the product whose `slug` matches |
| `/_pages` | internal list of every page, useful for review links |
| anything else | 404 page |

## Adding a new product page

1. Copy `src/content/products/_template.js` to `src/content/products/your-product.js`.
2. Set `slug`, `name` and `meta`, then fill in the copy.
3. Delete the section objects the product does not need and reorder the rest. Order in the array is order on the page.
4. Register it in `src/content/index.js`:

```js
import yourProduct from './products/your-product'
export const pages = [payLater, cashLoan, yourProduct]
```

5. Run `npm run dev` and check `/your-product`.

That is the whole workflow. You should not need to touch a component or a stylesheet to ship a new page.

## Section reference

Every section object needs a `type`. Add an `id` when the section is a link target from the nav. Most sections accept `eyebrow`, `title`, `description` and `background`.

`background` accepts `default`, `subtle`, `sunken`, `dark` or `brand` depending on the section. Alternate bands rather than stacking two of the same tone.

| `type` | Purpose | Main keys |
|---|---|---|
| `hero` | Opening statement | `layout` (`split` or `centered`), `badge`, `title`, `description`, `ctas[]`, `note`, `highlights[]`, `media` |
| `logoStrip` | Partner or merchant proof | `title`, `items[{ name, src }]` |
| `steps` | How it works | `items[{ title, description }]`, `cta` |
| `features` | Benefit grid | `columns` (2, 3, 4), `variant` (`card` or `plain`), `items[{ icon, title, description, tone }]` |
| `spotlight` | Alternating image and copy rows | `rows[{ title, description, bullets[], media, link, reverse }]` |
| `stats` | Number band | `items[{ value, label }]` |
| `pricing` | Plans or terms | `plans[{ name, price, unit, description, badge, featured, features[], cta }]`, `note` |
| `testimonials` | Quote cards | `items[{ quote, name, role, avatar }]` |
| `faq` | Accordion | `items[{ question, answer }]`, `footerLink` |
| `ctaBand` | Closing call to action | `title`, `description`, `ctas[]`, `stores[]`, `media`, `note` |

Nav and footer are not sections. They come from `nav` and `footer` on the page object, both defaulting to the shared values in `src/content/brand.js`. Override per product by spreading:

```js
nav: { ...nav, links: [{ label: 'Features', href: '#features' }] },
```

## Images

Every image slot accepts `{ src, alt, ratio, label }`. Leave `src` as `null` and the slot renders a labelled dashed placeholder at the right ratio, so the layout holds while assets are still being produced and it is obvious what is missing.

Put real assets in `public/` and reference them as `/hero.png`.

## Icons

Icons are the **Solar Linear** set, and nothing else.

```bash
npm run icons     # regenerate src/assets/icons/icons.generated.js
```

`scripts/build-icons.mjs` holds the mapping from a semantic name used in content files to a Solar icon, and extracts the path data straight from the `@iconify-json/solar` package. To add an icon, add a line to that map and rerun. The build fails if the mapped name is not a `-linear` variant, which keeps every page on one icon family.

Only mapped icons are bundled, so page weight stays proportional to use. Never hand-write or redraw a path.

## Buttons

Buttons are the Billease library Button (Figma node `16:182`) in `src/components/ds/Button.jsx`, used through `src/components/ui/Cta.jsx`.

The primary call to action uses the **gradient** variant, red 400 to red 500 top to bottom, which is the signature Billease action button and the first variant in the Figma set. On dark and brand bands the library `secondary` variant carries the action instead, since a red button on red has no contrast.

## Design tokens

`src/styles/tokens.css` is **generated** from `tokens/variables.json`, the Figma variables export. Never hand-edit it.

```bash
npm run tokens    # regenerate tokens.css from tokens/variables.json
npm run check     # fail on undefined tokens, raw hex, hardcoded font sizes
```

To change a token: change it in Figma, re-export the variables, replace `tokens/variables.json`, run `npm run tokens`.

Prefer semantic tokens over primitives. Use `--bg-primary`, not `--color-red-500`.

### Typography

There is no marketing type scale. Type comes from the Figma text styles, generated as classes:

| Role | Class | Size |
|---|---|---|
| Hero headline | `heading-xl-bold` | 32 |
| Section heading | `heading-lg-bold` | 24 |
| Subsection | `heading-md-semibold` | 20 |
| Card heading | `heading-sm-semibold` | 16 |
| Body copy | `body-md-regular` | 16 |
| Supporting copy | `body-sm-regular` | 14 |
| Labels, legal | `body-xs-regular`, `body-xxs-regular` | 13, 11 |
| Links | `link-md`, `link-sm` | 16, 14 |
| Eyebrow | `label-xs` | 13, small caps |

Never write `font-size`, `font-weight` or `line-height` in a component. `npm run check` fails if you do.

### Components

Buttons are the Billease library Button (Figma node `16:182`) in `src/components/ds/`, used through `src/components/ui/Cta.jsx`. Do not build another button.

The library has no card, chip, accordion or icon-container component, so those are composed from foundations in `landing.css` following the radius, border and elevation rules. If you need a pattern that does not exist, compose it from foundations rather than inventing a component.

### Layout classes

| Class | Does |
|---|---|
| `l-band` | Full-bleed section with band padding and gutters. Modifiers: `--lg`, `--tight`, `--subtle`, `--sunken`, `--dark`, `--brand` |
| `l-container` | Centres content at 1200px. `--narrow` for 760px |
| `l-measure` | Caps prose at a readable line length |
| `l-stack l-stack--400` | Vertical flex with a spacing token gap |
| `l-grid l-grid--3` | Responsive grid, 1 column on mobile |
| `c-card`, `c-badge`, `c-icon-tile`, `c-media` | Compositions from foundations |
| `t-subtle`, `t-on-dark`, `t-brand`, `t-center` | Colour and alignment helpers only |

## Adding a new section type

1. Build the component in `src/components/sections/`, taking its content as props.
2. Register it in `src/components/sections/index.js`.
3. Add a row to the table above and a stub to `_template.js`.

Use existing layout and type classes. A new section should not need new colours, spacing values or type sizes.

## Project skills

`.claude/skills/` holds two skills scoped to this repo, so they travel with a clone:

| Skill | Use it for |
|---|---|
| `frontend-engineer` | Adding a page or a section type, layout and styling work, the verification and deploy loop |
| `ux-designer` | Reviewing a page: hierarchy, the conversion path, accessibility, responsive behaviour |

Both encode the rules above, so an agent working in this repo will not invent tokens or components.

## Deploying

The repo is set up for Vercel. `vercel.json` rewrites all paths to `index.html` so client-side routes work on refresh.

Vercel settings: framework Vite, build command `npm run build`, output directory `dist`. Pushing to `main` deploys production; every other branch gets a preview URL, which is the easiest way to review new product copy before it goes live.

## Financial content

Never write fees, interest, eligibility, limits, repayment terms, merchant acceptance, security capabilities or activation timing. These come from Product, Risk or Legal.

Anything unconfirmed stays marked `CONTENT DEPENDENCY` and visible in the page, so it cannot ship by accident. Both example pages currently carry these markers where figures would go. See DESIGN-RULES.md section 16.

## Before a page goes live

- Replace every `CONTENT DEPENDENCY` marker with confirmed content.
- Replace the placeholder legal text in `src/content/brand.js` with the wording Legal signed off.
- Set real `meta.title` and `meta.description`.
- Swap every placeholder image for a real asset.
- Add the official Billease logo to `public/` and set `brand.logo`, then replace `public/favicon.svg`.
- Work through the design review checklist in DESIGN-RULES.md section 17.
