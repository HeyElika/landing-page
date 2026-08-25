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

Sections follow the Billease narrative in DESIGN-RULES.md section 10. **Keep the order.** It answers the user's questions in the sequence they ask them.

| # | `type` | Answers | Main keys |
|---|---|---|---|
| 1 | `hero` | What is this, and what do I do? | `layout` (`split`/`centered`), `badge`, `title`, `description`, `ctas[]`, `note`, `highlights[]`, `media` |
| 1b | `trustBar` | Can I trust you? | `items[{ icon, value, label }]`, `badges[{ name, src }]`, `note` |
| 2 | `features` | Why should I care? | `columns` (2, 3, 4), `variant` (`card`/`plain`), `items[{ icon, title, description }]` |
| 3 | `useCases` | Where can I use it? | `items[{ icon, title, description }]`, `note` |
| 4 | `steps` | What happens next? | `items[{ title, description }]`, `cta` |
| 5 | `pricing` | What does it cost? | `plans[{ name, price, unit, description, badge, featured, features[], cta }]`, `note` |
| 6 | `conditions` | What should I know? | `items[{ icon, title, detail }]`, `note` |
| 7 | `security` | Is it safe? | `items[{ icon, title, description }]` |
| 8 | `faq` | Anything else? | `items[{ question, answer }]`, `footerLink` |
| 9 | `ctaBand` | What do I do now? | `title`, `description`, `ctas[]`, `stores[]`, `media`, `note` |

`spotlight` is also available for explaining one feature in depth: `rows[{ title, description, bullets[], media, link, reverse }]`.

Two rules that are not negotiable:

- **`conditions` must come before `faq`.** Fees, limits and timing belong on the page, not buried in an accordion. Rule 16 puts transparency ahead of conversion.
- **One primary action per page**, repeated in the nav, the hero and the closing band, worded identically each time.

Every section accepts `background`: `default`, `subtle`, `sunken`, `dark` or `brand`. Alternate meaningfully rather than mechanically.

### Deliberately absent

There is no logo strip or testimonial wall. They are generic marketing furniture and rule 2 warns against exactly that look.

`trustBar` is the one exception, added after checking how comparable card pages are actually built: Wise leads with a Trustpilot score, Salmon with an App Store rating plus BSP, SEC and AMLC seals, Atome with SEC and DTI marks. For a lending product, "can I trust you" is a real question that comes before "what does it cost". It is not a vanity metrics band: every figure must be real and current, so unconfirmed values stay marked and visible.

Nav and footer are not sections. They come from `nav` and `footer` on the page object, both defaulting to the shared values in `src/content/brand.js`. Override per product by spreading:

```js
nav: { ...nav, links: [{ label: 'Features', href: '#features' }] },
```

The footer follows the live billease.ph footer, reduced to one band: logo, a flat row of links, the regulatory statement, regulator badges, copyright and socials. Its keys are `links[]`, `legal[]`, `badges[]`, `social[]` and `copyright`. It sits on a light background, so it uses `brand.logo` rather than `brand.logoOnDark`.

The regulatory statement is copied verbatim from the live site and must not be paraphrased. The NPC, SEC and BSP badge images are not in this repo; add them to `public/` and set each badge's `src`, or drop the entries.

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

## Logo

The official wordmark is in `public/`, taken from the shared brand assets folder:

| File | Use |
|---|---|
| `billease-logo.png` | light backgrounds (nav) |
| `billease-logo-on-dark.png` | dark backgrounds (footer) |

Both are 276x60, so they stay sharp at the 24px display height. `brand.logo` and `brand.logoOnDark` in `src/content/brand.js` point at them. Never redraw or recolour the logo.

The `billease+billie` lockups with the mascot are also in the brand folder if a page needs them.

## Buttons

Buttons are the Billease library Button (Figma node `16:182`) in `src/components/ds/Button.jsx`, used through `src/components/ui/Cta.jsx`.

The primary call to action uses the **primary** variant, flat Billease red. On dark and brand bands the library `secondary` variant carries the action instead, since a red button on red has no contrast.

The `gradient` variant from the Figma set is implemented in `Button.jsx` and available, but is not used on these pages.

## Design tokens

`src/styles/tokens.css` is **generated** from `tokens/variables.json`, the Figma variables export. Never hand-edit it.

```bash
npm run tokens    # regenerate tokens.css from tokens/variables.json
npm run check     # fail on undefined tokens, raw hex, hardcoded font sizes
```

To change a token: change it in Figma, re-export the variables, replace `tokens/variables.json`, run `npm run tokens`.

Prefer semantic tokens over primitives. Use `--bg-primary`, not `--color-red-500`.

### Typography

Body and small-heading type comes from the Figma text styles, generated as classes. Section and hero headings use a **display scale** that grows with the viewport.

| Role | Class | Mobile | Desktop |
|---|---|---|---|
| Hero headline | `display-lg` | 32 | 56 |
| Section heading | `display-md` | 24 | 40 |
| Subsection heading | `display-sm` | 20 | 28 |
| Card heading | `heading-md-semibold` | 20 | 20 |
| Body copy | `body-md-regular` | 16 | 16 |
| Lead copy under a heading | `body-lg-regular` | 20 | 20 |
| Supporting copy | `body-sm-regular` | 14 | 14 |
| Labels, legal | `body-xs-regular`, `body-xxs-regular` | 13, 11 | |
| Links | `link-md`, `link-sm` | 16, 14 | |
| Eyebrow | `label-xs` | 13, small caps | |

The display scale is an approved extension past the token scale, documented in DESIGN-RULES.md section 3. Each step resolves to an exact token value at 360px, so phones render token sizes and only desktop goes beyond. `npm run check` fails if that stops holding.

Never write `font-size`, `font-weight` or `line-height` in a component.

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
- Replace `public/favicon.svg`, which is still a placeholder mark rather than the official one.
- Work through the design review checklist in DESIGN-RULES.md section 17.
