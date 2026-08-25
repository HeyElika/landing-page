# Billease landing page template

A content-driven landing page template in the Billease visual language. The layout, spacing, colour and typography are fixed. Launching a new product page means writing one content file, not writing CSS.

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

Icons come from the Billease icon library copied from Figma file `qESeTFW1GEEosrYnm4Hu3b`. Use a name from `src/assets/icons/index.js`, for example `wallet`, `installment-outline`, `security`, `store`, `tick`. An unknown name renders a visible dashed label instead of failing, so a typo is easy to spot.

Never add inline SVG paths. If the icon you want is not in the library, use the closest one and raise it against the design system.

The full library is around 130 kB before compression. If page weight becomes a concern for a specific deployment, trim `src/assets/icons/index.js` to the icons that page actually uses.

## Design tokens

`src/styles/tokens.css` is copied verbatim from the Billease design system (`Billease-app/src/index.css`), which mirrors Figma. Do not edit it here. If a token changes, change it in the design system first and re-copy the file.

`src/styles/landing.css` is the marketing layer. It adds only two things the product system does not cover:

- a display type scale above `--text-3xl` (32px), because the product scale is built for a phone screen and stops there
- page rhythm: container width, gutters and band padding

Everything else in that file resolves to a token. No raw hex, no invented spacing, no second type scale.

Layout classes worth knowing when adding a section component:

| Class | Does |
|---|---|
| `l-band` | Full-bleed section with vertical padding and gutters. Modifiers: `--lg`, `--tight`, `--subtle`, `--sunken`, `--dark`, `--brand` |
| `l-container` | Centres content at 1160px. `--narrow` for 760px |
| `l-stack l-stack--400` | Vertical flex with a spacing token gap |
| `l-grid l-grid--3` | Responsive grid, 1 column on mobile |
| `t-display`, `t-h2`, `t-h3`, `t-h4`, `t-lead`, `t-body`, `t-caption`, `t-eyebrow` | Type roles |
| `c-card`, `c-btn`, `c-badge`, `c-icon-tile` | Surfaces and controls |

## Adding a new section type

1. Build the component in `src/components/sections/`, taking its content as props.
2. Register it in `src/components/sections/index.js`.
3. Add a row to the table above and a stub to `_template.js`.

Use existing layout and type classes. A new section should not need new colours, spacing values or type sizes.

## Deploying

The repo is set up for Vercel. `vercel.json` rewrites all paths to `index.html` so client-side routes work on refresh.

Vercel settings: framework Vite, build command `npm run build`, output directory `dist`. Pushing to `main` deploys production; every other branch gets a preview URL, which is the easiest way to review new product copy before it goes live.

## Before a page goes live

- Replace the placeholder legal text in `src/content/brand.js` with the wording legal signed off.
- Replace the pricing `note` with the approved rate disclosure.
- Set real `meta.title` and `meta.description`.
- Swap every placeholder image for a real asset.
- Replace `public/favicon.svg` and set `brand.logo` with the official wordmark export.
