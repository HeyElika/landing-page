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

## Naming

One name per pattern, in three places that always agree: the registry key
(`benefits`), the component (`Benefits`), the file (`Benefits.jsx`).

**The rule: name the layout, not the content one page put in it.** A name has
to survive the second page using the pattern. Four failed that test and were
renamed:

| Was | Now | Why the old name failed |
|---|---|---|
| `features` | `benefits` | The rules cap this at three or four benefits, not a feature inventory. The name argued for the wrong content. |
| `security` | `mediaPoints` | An intro with a visual and supporting points beneath. Nothing about it is security-specific — it is the page's general text-and-image workhorse. |
| `ctaBand` | `finalCta` | Named its appearance (a band) rather than its job. |
| `spotlight` | `featureRows` | Said nothing at all. |

The old names still work: `SECTION_ALIASES` maps each to its replacement, so a
content file written before the rename keeps rendering.

Names describing a **page role** rather than a layout — `HowItWorks`,
`PricingConditions` — were deliberately not used. A role name is a promise
about where the section sits, and `steps` is just as valid three sections
later. The page role lives in the content file's `id`, which is what the nav
links to.

## Analytics

Components report themselves; a page inherits tracking by existing. Nothing to
wire up per product.

| Event | Fired by | Carries |
|---|---|---|
| `cta_click` | every button, everywhere | label, href |
| `faq_open` / `faq_close` | an FAQ row | the question |
| `store_click` | an App Store or Google Play badge | which store |
| `section_view` | any section, once, at 50% visible | section id or type |

`src/lib/track.js` pushes to `window.dataLayer` and dispatches a
`billease:track` DOM event. No vendor is baked in: point a tag manager at the
data layer, or add a listener in `index.html`. With no consumer the call costs
one array push — a landing page should not ship an analytics bundle to send
four events.

Event names live in `EVENTS` rather than being passed as strings, so two pages
cannot send `cta_click` and `click_cta` for the same thing.

## Governance: not building the same section twice

The risk is someone needing a layout, not finding it because they did not look,
and writing a second component that does what an existing one already did with
a prop. Three things make that hard:

1. **A section is unusable until it is registered**, and `check-sections.mjs`
   fails the build if a component in `sections/` is missing from `SECTIONS`.
2. **It must also appear in the catalogue.** The same check fails if a
   registered type has no entry in `patterns.js` — which forces the question
   "is this a variant of something we already have?" to be answered out loud
   rather than skipped.
3. **The rule is written down**: add a prop to an existing pattern before
   adding a pattern. `mediaPoints` covers text-and-image; `benefits` covers
   card rows; `panel` covers a contained block. If a new layout is genuinely
   new — as `statement` was — it goes in the catalogue with the rest.

## Versioning: improving a shared section

Every page uses the same component, so an improvement lands everywhere at once.
That is the point, and the risk: a change that assumes new content shape breaks
a page written before it.

Two things guard that. `check-sections.mjs` renders **every real page** as well
as every catalogue variant, so a section that no longer works with an older
content file fails the build rather than a visit. And a rename keeps its old
name in `SECTION_ALIASES`, so a content file written months ago keeps resolving.

The pattern to follow when changing a shared section: add an optional prop with
a default that reproduces today's behaviour, rather than changing what the
existing props mean. Both forms of the hero's `appLink`, linked and plain,
exist for exactly that reason.

### What actually protects a page nobody has opened

Rendering today's pages proves a change did not break what exists now. It says
nothing about a content file written months ago and untouched since.

`scripts/check-contract.mjs` holds the shapes each section has promised: an FAQ
still passing `items` rather than `groups`, an answer as a string rather than an
array, a hero title as one string rather than two lines, a page still using
`type: 'features'` from before the rename. Nineteen promises, each tagged with
the version it was made in, all rendered on every build.

That turns a silent break into a failing build with a name on it. Removing a
promise is then a deliberate act: delete the line, and record the break in
`CHANGELOG.md` in the same commit.

**So the answer to "will pages inherit an FAQ improvement safely" is yes, with
one condition:** add to the component, do not redefine what it already accepts.
If you must redefine, the contract check tells you exactly which pages will
notice, before they do.

## Section independence

Every section can be added, removed or reordered freely, and this is enforced
rather than assumed. `scripts/check-sections.mjs` runs in `npm run lint` and
renders each section alone, every adjacent pair in both orders, and the whole
set forwards and reversed — currently 19 sections, 36 pairings, 2 full
orderings.

It asserts the three things that make a section independent:

1. **It renders alone**, with no dependence on a neighbour existing.
2. **It carries its own vertical padding** via a band class, so deleting what
   sat above it cannot collapse the gap.
3. **It sits in the shared content box**, so its horizontal alignment comes
   from the page rather than from a sibling.

Two consequences worth knowing:

- **Order is content, not code.** Reordering a page means moving an object in
  the `sections` array. Nothing in a component knows what precedes it.
- **Every section brings its own boundary.** A tinted section gets a hairline
  when it meets another of the same tint. A white one gets nothing — a rule
  between every pair of white sections would read as a table — so it has to
  carry a section heading (`h1`/`h2`) or a visual with weight of its own: a
  card row, a photograph, a full-screen statement, a coloured panel. The
  checker fails a section that has neither, which is the case that would
  otherwise merge with its neighbour and only be caught by eye.

- **Same-tone neighbours draw their own boundary.** Two tinted sections running
  together used to read as one very tall section. A CSS rule now puts a
  hairline between any two adjacent bands sharing a tint, so no ordering can
  produce that. It is a line rather than a tone change: the page asked for that
  fill, and swapping it would make a section look different depending on what
  happened to precede it. White is exempt — consecutive white sections are this
  page's normal state, and a rule between every pair would read as a table.

## The narrative order

Sections are optional; the order is not. It answers a reader's questions in the
sequence they ask them.

| # | Question in the reader's head | Pattern |
|---|---|---|
| 1 | What is this, and what do I do? | `hero` |
| 2 | Why should I care? | `features` |
| 3 | Where does it work? | `useCases` |
| – | *(optional pause)* | `statement` |
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

Four cards need `width: 'wide'`, which drops the 1200px content column and runs
the row to the page gutters. Inside the column four cards are 276px each and
their titles wrap to three lines; at full width they grow with the screen — 320
at 1440, 440 at 1920.

---

## Statement

A full-screen pause carrying one message and the page's action. Its lines
converge as the section reaches the middle of the viewport — sliding in from
alternating sides and darkening from grey to full contrast — and they drift
back out as it leaves, because the animation is scrubbed by scroll position
rather than fired once. That is what makes it feel attached to the reader's
gesture rather than played at them.

Use it between two sections that would otherwise run together, and give it a
sentence rather than a paragraph. Under `prefers-reduced-motion` the lines are
simply aligned and at full contrast from the start.

## Responsive behaviour

Sections are fluid rather than fixed: they take a share of the screen, stack
below 900px, and no component sets a height that content has to fit inside.
`npm run stress` renders every pattern with deliberately awkward content —
headings four times too long, unbreakable words, doubled item counts — and
reports what strains.

Two things it found, both now handled:

- **Ragged rows.** Column count came from `min(items, 4)`, so six items became
  a row of four and a row of two. `gridColumns()` picks the widest count that
  divides the items evenly: six makes two rows of three. Seven still cannot be
  even at any width, and falls back to four.
- **Button labels cannot wrap.** The Figma spec sets `white-space: nowrap`, so
  a long label pushes past its container instead of breaking. That is correct
  for a button and wrong for a sentence: **keep CTA labels under about 25
  characters.** "Open Billease app" is 17.

What the tool cannot see is real layout — it renders markup, not a browser. It
catches structural fragility, not a heading that happens to look cramped at
820px.

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

## Variations are content, not code

A pattern's variations live in the content file. If you find yourself editing a
section component to make one page look right, that is the signal you are about
to break every other page that uses it — add a prop instead, give it a sensible
default, and show it in the catalogue.

Worked example: the hero's secondary line under the action. Give `appLink` an
`href` and the label is a link; leave the `href` out and it is emphasised text.
The Access Card page uses the plain form because its download panel is a scroll
away, so a second underlined thing under the button would read as a second
action. Another page can link it. Same component, no fork.

| Pattern | Variations available in content |
|---|---|
| `hero` | `layout`, `fit`, `background`, `badge`, `note`, `appLink` linked or plain |
| `features` | image cards vs icon cards (per item), `columns`, `width`, `fit`, `background`, `variant` |
| `statement` | `lines` (2\u20133), `ctas`, `background` |
| `stepsSplit` | `reverse`, `fit`, `background` |
| `security` | `reverse`, `background`, `link` |
| `panel` | `reverse`, `tone`, `background`, `bullets`, `cta`, `link` |
| `spotlight` | per-row `reverse`, `bullets`, `link` |
| `faq` | flat `items` or `groups`, string or array answers, `footerLink` |
| `appDownload` | `reverse`, `tone` (blue, dark, brand) |
| `ctaBand` | `background`, `media`, `stores`, `note` |

Two things are deliberately **not** configurable, because changing them breaks
the design rather than varying it: the corner radius, which is one value across
every image and container; and the feature card's dark fill, which the white
copy over the image depends on for legibility.

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

Three things go beyond the library, each because a landing page needs a size
the product UI never does. All are flagged in the code so they can be added
upstream, and the guards hold them to their definitions:

- **The display scale** (`--display-xl | lg | md | sm`) — the token scale stops
  at 32px. `check-type.mjs` holds each step to its endpoints.
- **`heading-lg-regular`** — the token set carries 24px only at 600 and 700, and
  a list of questions wants the size without the weight.
- **The `xl` button** (52px) — the Figma set stops at 48, which reads small
  under display type.

Read `DESIGN-RULES.md` before changing any of it.
