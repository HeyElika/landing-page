# CLAUDE.md

Content-driven landing page template in the Billease visual language.
One product page = one content file. The layout is fixed; pages are data.

## Read before changing any UI

`DESIGN-RULES.md` is the authoritative guardrail and overrides everything else
in this file. The Billease component library overrides both. Section 18 is the
implementation instruction; section 17 is the review checklist.

Supporting docs: `TOKENS.md` (every token and where it comes from),
`PATTERNS.md` (the section catalogue and how a page is assembled),
`README.md` (the full workflow).

## Routes

| Route | What it is |
|---|---|
| `/` | renders `pages[0]` from `src/content/index.js` |
| `/<slug>` | one product landing page per content file |
| `/patterns` | the section catalogue, rendered through the real components |
| `/tokens` | type, colour, icons and buttons reference |
| `/_pages` | internal index of every page |

## Adding a landing page

Every landing page in the project lives in this repo. To add one:

1. Copy `src/content/products/_template.js` to `src/content/products/<slug>.js`
2. Set `slug`, `name`, `meta`, then fill the copy
3. Delete sections the product does not need, keep the remaining order
4. Register it in `src/content/index.js`
5. `npm run dev`, then open `/<slug>`

Do not touch a component or a stylesheet to ship a page. If you think you need
to, the request was probably misread. Start at `/patterns`: every variation
there can be pasted straight into the sections array.

## Never

- Introduce a hex value, a spacing number or a type size. `src/styles/tokens.css`
  is generated from the Figma export. Change a token in Figma, re-export, run
  `npm run tokens`
- Write fees, interest, limits, eligibility, repayment terms, merchant
  acceptance, security claims or activation timing. Those come from Product,
  Risk or Legal. Mark anything unconfirmed `CONTENT DEPENDENCY` and leave it
  visible in the page

## Verify

`npm run lint` runs ESLint plus seven guards: tokens, type, layout, sections,
contract, alignment, duplicates. `npm run build` builds, prerenders every route
and writes the sitemap. `npm run stress` renders every pattern with awkward
content. CI runs all three on push to `main` and on every pull request.

## Deploy

Not automatic. The Vercel GitHub App is not authorised for the `HeyElika`
account, so a push does not deploy. Ship with:

```sh
vercel deploy --prod --yes
```
