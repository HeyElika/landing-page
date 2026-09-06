# Image brief

Every image slot on a Billease landing page, what it renders at, and what to
export. This file is the source of truth: it lives beside the code, so when a
slot changes the brief changes with it.

Numbers below are computed from the layout constants in `src/styles/landing.css`
(`--page-max: 1200`, gutters 20/32, grid gap 32), not measured off a screenshot.

---

## What to export

| Slot | Ratio | Export | Format | Max weight |
|---|---|---|---|---|
| Hero visual | 3:4 | **1440 × 1920** | JPEG | 250 KB |
| Benefit card (×3) | 2:3 | **1200 × 1800** | JPEG | 200 KB |
| Steps visual | 1:1 | **1440 × 1440** | JPEG | 200 KB |
| Safety visual | 1:1 | **1440 × 1440** | JPEG | 200 KB |
| App icon | 1:1 | **288 × 288** | PNG, transparent | 80 KB |

One export per slot covers every screen. The browser scales a single file down;
there is no separate mobile crop to produce, and no `@2x` naming convention —
the sizes above already are the 2× export.

### How one file becomes the mobile version

Nothing is re-cropped. A slot has the **same aspect ratio at every breakpoint** —
no media query changes it — so the phone gets the identical picture, drawn
smaller:

| | Renders at | Ratio | Share of the file |
|---|---|---|---|
| Phone 390 | 350 × 466 | 3:4 | 49% |
| Tablet 768 | 704 × 939 | 3:4 | 98% |
| Laptop 1440 | 495 × 660 | 3:4 | 69% |
| Large 1920 | 600 × 800 | 3:4 | 83% |

That is why the composition rules matter more than a size list: whatever is in
the frame is what a phone sees too, just smaller. There is no phone-specific
crop where a tighter shot could be substituted.

### Optional: a second size for phones

The one real cost of a single file is bytes. A phone downloads the tablet-sized
file — about **1.3 MB** of imagery on a page it renders at a third of that.

If that matters, supply a **half-size export of the same crop** alongside each
image, named `<file>@720.jpg`:

| Slot | Full | Half |
|---|---|---|
| Hero | 1440 × 1920 | 720 × 960 |
| Benefit card | 1200 × 1800 | 600 × 900 |
| Steps / Safety | 1440 × 1440 | 720 × 720 |

Set `srcSmall` on the slot in the content file and the browser picks whichever
fits the screen. Same crop, same ratio, roughly a quarter of the bytes on a
phone. Leave it out and everything still works — this is an optimisation, not a
requirement.

---

## Why those sizes

Each slot is fluid: it takes a share of the screen rather than a fixed box. The
export is twice the **widest** it ever renders, so it stays sharp on a retina
display at that width and scales down cleanly everywhere else.

The widest render is usually **tablet, not desktop**. Between roughly 700 and
900px the layout stacks, and an image that shares a row on a large screen takes
the full column on a tablet:

| Slot | Phone (390) | Tablet (768) | Laptop (1440) | Large (1920) |
|---|---|---|---|---|
| Hero | 350 × 466 | **704 × 939** | 495 × 660 | 600 × 800 |
| Benefit card | 304 × 456 | **599 × 899** | 379 × 568 | 379 × 568 |
| Steps | 350 × 350 | **704 × 704** | 558 × 558 | 564 × 564 |
| Safety | 350 × 350 | **704 × 704** | 576 × 576 | 576 × 576 |
| App icon | 96 × 96 | 96 × 96 | 144 × 144 | **144 × 144** |

Sizing from a desktop screenshot alone would ship visibly soft images on an
iPad, which is why the exports are built from the tablet figure.

---

## Composition

**The slot crops, it does not letterbox.** An image fills its slot and anything
that does not fit is trimmed from the edges, centred. Export at the stated ratio
and nothing is lost; export at a different ratio and the crop decides what to
cut, not you.

**Benefit cards carry copy over the image.** A title and a sentence sit at the
bottom of the card over a dark gradient. Keep the bottom **40%** clear of faces,
logos, hands and anything else the copy would sit on, and keep that area from
being bright — white text has to hold against it. The subject wants to be in the
top two thirds.

**Everything else is uncovered.** Hero, steps and safety slots carry no text.

**Corners are rounded by the page.** Export square corners. Artwork with its own
rounded corners produces two competing curves and a visible sliver between them.

---

## Files

- **sRGB**, always. A CMYK or Display-P3 export shifts colour in the browser.
- **JPEG for photography**, quality 80–85. A PNG photograph is three to four
  times the weight for no visible gain at these sizes.
- **PNG only where transparency is needed** — currently just the app icon.
  Never flatten a transparent PNG to JPEG: the transparent areas fill with
  black, which is how the app icon and the locked-card image both arrived with
  black corners the first time.
- **No text baked into the image.** Copy is set in the page, so it stays
  translatable, selectable and legible when the image scales.

---

## Slots currently unfilled

| Page | Slot | Placeholder label |
|---|---|---|
| Access Card | Benefit card 2 | Paying abroad |
| Access Card | Benefit card 3 | Spending limit in the app |

The hero, steps, safety and app-icon slots are filled, though the hero photo is
a placeholder crop rather than a 3:4 original.

---

## Adding a page

The slots above are this page's. Another product page uses the same patterns, so
the same five exports cover it — see `/patterns` for which slots each layout
brings with it, and `PATTERNS.md` for the rules that govern them.
