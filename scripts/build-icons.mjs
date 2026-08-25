/**
 * Generates src/assets/icons/icons.generated.js from the Solar Linear icon set.
 *
 * Path data is read straight from the @iconify-json/solar package. Nothing is
 * hand-drawn or redrawn: if an icon is wrong, change the mapping below, never
 * the generated file.
 *
 *   npm run icons
 *
 * Only the icons listed here are bundled, so page weight stays proportional to
 * what the pages actually use.
 *
 * Every entry MUST be a `-linear` variant. The build fails otherwise, which is
 * what keeps the pages on a single icon family.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const require = createRequire(import.meta.url)
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const solar = require('@iconify-json/solar/icons.json')

/** Semantic name used in content files -> Solar Linear icon. */
const MAP = {
  // navigation and controls
  'arrow-left': 'arrow-left-linear',
  'arrow-right': 'arrow-right-linear',
  'chevron-left': 'alt-arrow-left-linear',
  'chevron-right': 'alt-arrow-right-linear',
  'chevron-up': 'alt-arrow-up-linear',
  'chevron-down': 'alt-arrow-down-linear',
  'close': 'close-linear',
  'burger-menu': 'hamburger-menu-linear',
  'tick': 'check-circle-linear',

  // product and money
  'wallet': 'wallet-linear',
  'cash': 'money-bag-linear',
  'card': 'card-linear',
  'auto-debit': 'card-transfer-linear',
  'repayment': 'card-receive-linear',
  'installment-outline': 'bill-list-linear',
  'bill': 'bill-linear',
  'store': 'shop-linear',
  'calendar-outline': 'calendar-linear',
  'clock': 'clock-circle-linear',

  // trust and support
  'security': 'shield-check-linear',
  'lock': 'lock-keyhole-minimalistic-linear',
  'chat-outline': 'chat-round-dots-linear',
  'user': 'user-circle-linear',
  'document': 'document-text-linear',

  // misc
  'rocket': 'rocket-linear',
  'link': 'link-linear',
  'photo': 'gallery-linear',
  'phone': 'i-phone-linear',
  'star': 'star-linear',
}

const out = []
const missing = []
const nonLinear = []

for (const [semantic, solarName] of Object.entries(MAP)) {
  if (!solarName.endsWith('-linear')) { nonLinear.push(solarName); continue }
  const icon = solar.icons[solarName]
  if (!icon) { missing.push(solarName); continue }
  out.push(`  '${semantic}': ${JSON.stringify({
    solar: solarName,
    body: icon.body,
    viewBox: `0 0 ${icon.width ?? solar.width} ${icon.height ?? solar.height}`,
  })},`)
}

if (nonLinear.length) {
  console.error('Not from the Linear set:', nonLinear.join(', '))
  process.exit(1)
}
if (missing.length) {
  console.error('Not found in @iconify-json/solar:', missing.join(', '))
  process.exit(1)
}

const header = `// GENERATED FILE — do not edit. Run \`npm run icons\` to regenerate.
// Source: @iconify-json/solar v${require('@iconify-json/solar/package.json').version}, Linear set.
// Path data is copied verbatim from the package. Never hand-edit an icon path.

export const ICONS = {
`
writeFileSync(join(root, 'src/assets/icons/icons.generated.js'), header + out.join('\n') + '\n}\n')
console.log(`icons.generated.js written: ${out.length} Solar Linear icons`)
