/**
 * Section registry.
 *
 * The section set follows the Billease landing page narrative in
 * DESIGN-RULES.md section 10:
 *
 *   1. hero          what this is and the one action to take
 *   2. features      key benefits, three or four at most
 *   3. useCases      where and how the product can be used
 *   4. steps         how activation or sign-up works
 *      stepsSplit    the same, listed beside a single visual
 *   5. pricing       terms, where cost is a real user question
 *   6. conditions    important things to know, BEFORE the FAQ
 *   7. security      security and control
 *   8. faq           genuine conversion blockers
 *   9. ctaBand       repeat the single primary action
 *
 * `spotlight` is available for pages that need to explain a feature in depth,
 * and `panel` for lifting one idea out of the flow as a contained, tinted
 * container with copy beside an image.
 *
 * Deliberately absent: logo strips, testimonial walls and statistic bands.
 * They are generic marketing furniture, rule 2 warns against exactly that
 * look, and the numbers they need are usually unconfirmed. Do not add them
 * back without a product reason.
 *
 * To add a section type: build the component here, register it below, and
 * document it in README.md.
 */
import Hero from './Hero'
import Benefits from './Benefits'
import UseCases from './UseCases'
import Steps from './Steps'
import StepsSplit from './StepsSplit'
import FeatureRows from './FeatureRows'
import Panel from './Panel'
import Pricing from './Pricing'
import Conditions from './Conditions'
import ChoicePair from './ChoicePair'
import FeatureSplit from './FeatureSplit'
import FAQ from './FAQ'
import FinalCta from './FinalCta'
import AppDownload from './AppDownload'
import Statement from './Statement'
import NavBar from './NavBar'
import Footer from './Footer'

export const SECTIONS = {
  hero: Hero,
  benefits: Benefits,
  useCases: UseCases,
  steps: Steps,
  stepsSplit: StepsSplit,
  featureRows: FeatureRows,
  panel: Panel,
  pricing: Pricing,
  conditions: Conditions,
  choicePair: ChoicePair,
  statement: Statement,
  featureSplit: FeatureSplit,
  appDownload: AppDownload,
  faq: FAQ,
  finalCta: FinalCta,
}

/**
 * Old names, kept so a content file written before the rename keeps working.
 * Each described what one page put in the section rather than what the section
 * does; see the naming rule in PATTERNS.md.
 */
export const SECTION_ALIASES = {
  features: 'benefits',
  security: 'featureSplit',
  mediaPoints: 'featureSplit',
  ctaBand: 'finalCta',
  spotlight: 'featureRows',
}

for (const [alias, target] of Object.entries(SECTION_ALIASES)) SECTIONS[alias] = SECTIONS[target]

export const SECTION_TYPES = Object.keys(SECTIONS)

/**
 * Page chrome. Not sections: a page has exactly one of each, always at the top
 * and the bottom, so they are not orderable and not repeatable. They are
 * catalogued all the same, because a page still has to choose a variant of
 * each. Kept out of SECTIONS so a content file cannot put a header halfway
 * down a page.
 */
export const CHROME = {
  navbar: NavBar,
  footer: Footer,
}
