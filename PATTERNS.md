# Pattern catalogue

Every layout this template can build, what each one is for, and the props that
change it. **The live version is at `/patterns`** — it renders each pattern
through the same component a product page uses, so it can never drift from the
code. This file is the reference; that page is the proof.

Building a page means choosing patterns and writing copy. It should not mean
writing CSS. If a layout you need is not here, add it as a variant of an
existing section before adding a new section type.

---

## How a page is assembled

```
src/content/products/your-product.js   ← the only file you write
        ↓  sections: [{ type: 'hero', ... }, { type: 'features', ... }]
src/LandingPage.jsx                    ← maps each object to a component
src/components/sections/index.js       ← the registry of available types
```

Copy `src/content/products/_template.js`, register it in
`src/content/index.js`, and it is live at `/your-slug`.

---

## The narrative order

Sections are optional; the order is not. It answers a reader's questions in the
sequence they ask them.

| # | Question in the reader's head | Pattern |
|---|---|---|
| 1 | What is this, and what do I do? | `hero` |
| 2 | Why should I care? | `features` |
| 3 | Where does it work? | `useCases` |
| 4 | What happens if I start? | `stepsSplit` or `steps` |
| 5 | What does it cost? | `pricing` |
| 6 | What must I know first? | `conditions` |
| 7 | Is it safe? Am I in control? | `security` |
| 8 | What if I still have a question? | `faq` |
| 9 | Fine — how do I start? | `appDownload` or `ctaBand` |

Two rules that outrank layout preference:

- **One action per page.** The hero CTA, the header CTA and the closing CTA are
  the same action with the same label. A second, different action splits the
  page's job.
- **Conditions go on the page, never only in the FAQ.** Anything a reader needs
  in order to decide — cost, timing, eligibility — belongs in `conditions`
  above the FAQ. An answer they have to open first is not disclosure.

---

## Text and image

Three patterns put copy beside a visual. They differ in what surrounds them.

| Pattern | Use when | Flip with |
|---|---|---|
| `security` | An intro with a visual, then supporting points below | `reverse: true` |
| `panel` | One idea lifted out of the flow, in a tinted container | `reverse: true` |
| `spotlight` | Several ideas in a row, alternating sides | automatic; `reverse` per row |

All three take `media: { src, alt, ratio }`. **Set `ratio` to the file's own
aspect ratio** — the slot crops to fill, so a mismatch silently trims the image.
Every image slot and container uses one corner radius, `--radius-2xl`; nothing
in a content file can change it.

---

## Benefits

`features` has two forms, chosen by what the item carries:

- **Give an item `media`** → portrait image card, copy over the image. Use when
  you have real photography. Three across on desktop; on phones they become one
  horizontal swipe row.
- **Give an item `icon`** → icon card. Use when the photography does not exist
  yet. `columns` accepts 2, 3 or 4.

Three or four items. This is not a feature inventory.

---

## Fitting a section to one screen

`hero`, `features` and `stepsSplit` accept `fit: 'viewport'`, which holds the
section to a single screen on desktop so a scroll moves from one section to the
next. It only applies above 900px wide and 700px tall — a short window gets the
normal flowing layout, because squeezing a section into 500px helps nobody.

Inside a fitted section the visual is capped by **width**, never by height.
Capping both axes makes them definite and CSS discards `aspect-ratio` entirely,
which stretches the image. This has been the cause of every "why is the image
the wrong shape" bug in this repo.

---

## Backgrounds

Most sections take `background: 'default' | 'subtle' | 'sunken' | 'dark'`.

One rule governs it: **a borderless card must sit on a band tone different from
its own fill.** White cards need a tinted band; dark cards can sit on white.
That is why this page runs white throughout — its feature cards are dark.

---

## Images

| Slot | Renders at (1440×900) | Export at 2× |
|---|---|---|
| Hero visual | 494 × 692 | 988 × 1384 |
| Feature card | 379 × 568 | 758 × 1136 |
| Steps visual | 564 × 564 | 1128 × 1128 |
| Split visual | 576 × 432 | 1152 × 864 |
| App icon | 144 × 144 | 288 × 288 |

Two things that have bitten us:

- **Transparency and JPEG do not mix.** Flattening an image with transparent
  rounded corners fills them with black. Keep it a PNG, or composite it onto
  the colour it will sit on.
- **Corners baked into a file fight the CSS radius.** If artwork arrives with
  its own rounded corners, crop past them and let the slot do the rounding.

---

## What is fixed

Colour, type, spacing, radius and component behaviour come from the token
system and the Billease component library. A content file cannot change them,
which is the point: a new page inherits every decision already made.

The one place this template goes beyond the library is the display type scale
(`--display-lg | md | sm`), because the token scale stops at 32px and landing
page headlines need more. That was approved explicitly, and the guard in
`scripts/check-type.mjs` holds it to its endpoints.

Read `DESIGN-RULES.md` before changing any of it.
