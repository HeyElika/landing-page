# Design tokens

Every value this template can use, where it comes from, and what enforces it.
Read this before adding CSS to a landing page: if a value you need is not here,
that is the signal to ask for it rather than to type a number.

**Short answer to "is anything hardcoded?"** Colour, spacing, radius, type,
icon size, border width and layout constants are all centralised. Breakpoints
are not, and cannot be — CSS custom properties do not work inside media
queries. They are listed here instead, and there are six where there should be
four.

---

**Seeing them.** `npm run tokens:page` builds `token-reference.html`: every
value rendered as itself rather than described. It reads the same files the
build does, so it is accurate by construction.

It shows what **this project uses**, not the whole export — 82 of the 223
tokens, 12 of the 17 type styles, 20 of the 32 icons. The rest are listed by
name at the end. A reference padded with 141 colours no page has used is a
reference nobody reads, and it hides the palette the pages actually share.

## Where tokens live

| Layer | File | Editable? |
|---|---|---|
| Design system | `src/styles/tokens.css` | **No.** Generated from the Figma export by `npm run tokens`. |
| Source of truth | `tokens/variables.json` | The Figma variables export, v1.0.4. |
| Landing layer | `src/styles/landing.css` `:root` | Yes — layout constants and the display scale only. |
| Icons | `src/assets/icons/icons.generated.js` | **No.** Generated from `@iconify-json/solar` by `npm run icons`. |

Two generated files, so nothing is hand-copied: 223 design tokens and 32 Solar
Linear icons. Editing either by hand is lost on the next regeneration.

---

## Typography

**Sizes** — `--text-xs 11 · sm 13 · md 14 · lg 16 · xl 20 · 2xl 24 · 3xl 32`

**Weights** — `--font-weight-regular 400 · semibold 600 · bold 700`

**Family** — `--ds-font-family` (Source Sans Pro). The landing pages render in
Overused Grotesk, self-hosted, mapped onto the same variable.

Never set `font-size` directly. Use one of the 20 generated classes:

```
display-xl  display-lg  display-md  display-sm            ← landing only, fluid
heading-lg-bold  heading-lg-semibold  heading-lg-regular
heading-md-bold  heading-md-semibold  heading-sm-semibold
body-lg-regular  body-lg-semibold
body-md-regular  body-md-semibold
body-sm-regular  body-sm-semibold
body-xs-regular  body-xxs-semibold
link-md  link-sm
```

### The display scale

The token scale stops at 32px, which is too small for a landing page headline.
Four fluid steps live in `landing.css`, each solved through both endpoints so
it hits the token size on a small phone and its cap on a large screen:

| Token | 360px | 1280px+ | Used for |
|---|---|---|---|
| `--display-xl` | 32 | 80 | A statement with a screen to itself |
| `--display-lg` | 32 | 56 | Hero headline |
| `--display-md` | 24 | 48 | Section heading |
| `--display-sm` | 20 | 32 | Card and sub-section heading |

`scripts/check-type.mjs` fails the build if any step drifts from its endpoints.

---

## Spacing

`--space-050 2 · 100 4 · 200 8 · 300 12 · 400 16 · 500 20 · 600 24 · 700 28 ·
800 32 · 900 40 · 1000 48`

Compose larger values from tokens rather than inventing them:
`calc(var(--space-1000) + var(--space-400))`, not `64px`.

Use the layout classes rather than per-element margins: `.l-stack--{100…900}`
sets a gap, `.l-row` a horizontal one. Sibling margins collapse and double;
gaps do not.

### Vertical rhythm

| Token | Phone | Tablet | Desktop | Used by |
|---|---|---|---|---|
| `--band-y-tight` | 32 | 40 | 64 | Footer, download panel |
| `--band-y` | 48 | 64 | 80 | Standard section |
| `--band-y-lg` | 56 | 80 | 112 | Hero, emphasis sections |

Sized against each other, not in isolation: a viewport-fitted section can only
give 48px to an edge, so a free-standing band at 112 next to one produced a
224px gap beside a 96px one. `scripts/check-tokens.mjs` fails the build if any
of these is not composed from space tokens.

---

## Radius

`--radius-xxs 1 · xs 2 · sm 4 · md 8 · lg 12 · xl 16 · 2xl 24 · full 9999`

**Every image and container uses `--radius-2xl`.** Not a convention — a rule.
Mixed corners across a page read as a bug, and artwork carrying its own rounded
corners fights the CSS one. `--radius-full` is for pills and circular markers;
`--radius-md` for small controls like the store buttons.

---

## Layout constants

| Token | Value | What it governs |
|---|---|---|
| `--page-max` | 1200px | The content column every section shares |
| `--page-gutter` | 20 / 32 | Page margin, phone / 768px up |
| `--nav-h` | 72px | Sticky header height |
| `--measure` | 68ch | Maximum line length for prose |
| `--column-reading` | 640px | Prose-only sections |
| `--column-narrow` | 760px | Narrow content sections |
| `--column-list` | 976px | A list of controls, e.g. the FAQ |

The gutter sits on the band, **outside** `.l-container`. Anything that puts
padding inside the container ends up offset by one gutter above 1264px — the
nav did exactly that once. `scripts/check-layout.mjs` fails the build if a
`.l-container` sets its own horizontal padding.

---

## Icons

`--icon-size-xs 16 · sm 20 · md 24 · lg 32 · xl 40 · 2xl 48`

```jsx
<Icon name="chevron-down" size="sm" color="var(--icon-subtle)" />
```

32 icons, all Solar Linear, generated from `@iconify-json/solar`. To add one,
map it in `scripts/build-icons.mjs` and run `npm run icons`. Never paste path
data: a hand-copied glyph drifts from the set's stroke weight and misses
package updates.

---

## Colour

223 tokens exported; **31 in use** on these pages. Use the **semantic** layer,
never a primitive, unless the semantic one genuinely does not exist:

| Group | Examples |
|---|---|
| Background | `--bg-base` `--bg-subtle` `--bg-sunken` `--bg-primary` |
| Text | `--text-base` `--text-subtle` `--text-disabled` `--text-on-dark` |
| Border | `--border-subtle` `--border-bold` `--border-heavy` `--border-brand-primary` |
| Icon | `--icon-base` `--icon-subtle` `--icon-disabled` `--icon-on-dark` |
| Alpha | `--alpha-black-10…70` `--alpha-white-10…70` |
| Primitives | `--color-neutral-100…900`, red, blue, green, yellow, magenta |

`check-tokens.mjs` fails the build on any hex literal, and on any `var(--x)`
that is not defined.

Two learned rules:

- **Red is for actions and brand emphasis only.** Not icons, not numbered
  markers, not chip fills.
- **A borderless card needs a band tone different from its own fill.** White
  cards belong on a tinted band; dark cards can sit on white.

---

## Border widths

`--border-width-xs 1 · sm 2 · md 3`

A hairline calibrated for a component edge reads heavy stretched across a full
container. At page width use `--alpha-black-10` rather than `--border-subtle`.

---

## Breakpoints — the one thing not centralised

CSS custom properties do not work inside media queries, so these are literals.
They are listed here because that makes them a shared decision rather than six
independent guesses:

| Width | What changes |
|---|---|
| 640px | Two-column grids appear |
| 768px | Gutter 20 → 32, band rhythm steps up |
| 900px | **The main one.** Split layouts go side by side; viewport-fitted sections activate; the card row stops being a carousel |
| 960px | Three and four column grids appear |
| 1024px | Band rhythm steps up again |
| 1200px | Wider gaps between split columns |

**Known wart:** 900 and 960 do almost the same job, and 640 and 768 overlap.
A future page should collapse these to four — 640, 900, 1200 plus the gutter
change — rather than adding a seventh. Flagged rather than fixed, because
moving them now would shift layouts on the live page for no visible gain.

`Media.jsx` also carries `(max-width: 900px)` in its `sizes` attribute, which
has to agree with the CSS by hand.

---

## Deliberate exceptions

Three values go beyond the library, each because a landing page needs something
the product UI does not. All are flagged in the code so they can be added
upstream:

| Addition | Why | Where |
|---|---|---|
| Display scale | The token scale stops at 32px | `landing.css` |
| `heading-lg-regular` | 24px exists only at 600 and 700 | `landing.css` |
| Button size `xl` (52px) | The Figma set stops at 48 | `components/ds/Button.jsx` |

Anything else is a bug. If a page needs a value that is not here, add it to the
token export, not to a component.

---

## The guards

`npm run lint` runs ESLint plus four checks, and the build fails on any of them:

| Script | Catches |
|---|---|
| `check-tokens.mjs` | Hex literals, undefined tokens, hardcoded `font-size`, band rhythm not composed from space tokens |
| `check-type.mjs` | A display step that no longer hits its endpoints |
| `check-layout.mjs` | A `.l-container` setting its own horizontal padding |
| ESLint | Unused code, React rules |

These exist because each one caught a real bug: a nav offset by a gutter above
1264px, a headline that resolved to 41.9px where the token said 32, and a
colour typed as a hex rather than a token.

---

See also `PATTERNS.md` for the layouts these tokens build, and `ASSETS.md` for
image sizes.
