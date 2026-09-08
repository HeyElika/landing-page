# Pattern changelog

Every page shares these components, so a change here reaches pages nobody
opened. This is where that gets recorded.

One line per change, newest first. A change that breaks a promise in
`scripts/check-contract.mjs` needs the promise deleted and the break written
here, in the same commit.

## 1.4

- `featureSplit` replaces `mediaPoints`, which was a name I invented rather
  than the conventional term for text one side and image the other. Old names
  `mediaPoints` and `security` both still resolve.

## 1.3

- `statement` added: a full-screen pause with converging lines.
- `hero.appLink` accepts an optional `href`. Without one the label is plain
  emphasis rather than a link.
- Buttons gained `xl` (52px), and hover and press states on every page.
- Type scale replaced fluid `clamp()` with stepped t-shirt sizes, so every
  rendered size is a whole pixel.

## 1.2

- Renamed, old names kept as aliases: `features` to `benefits`, `security` to
  `featureSplit`, `ctaBand` to `finalCta`, `spotlight` to `featureRows`.
- `featureSplit` and `appDownload` accept `reverse`; `appDownload` accepts
  `tone`.
- `faq` answers accept an array of paragraphs as well as a string.
- `faq` rows are one question each rather than a group that expands into
  several.

## 1.1

- `benefits` items with `media` render as image cards; items with `icon` keep
  the icon card.
- `hero.title` accepts an array of authored lines.

## 1.0

- First set of sections.
