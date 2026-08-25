/**
 * Section registry.
 *
 * The section set follows the Billease landing page narrative in
 * DESIGN-RULES.md section 10:
 *
 *   1. hero          what this is and the one action to take
 *   2. trustBar      rating and regulator marks, where trust gates the decision
 *   2. features      key benefits, three or four at most
 *   3. useCases      where and how the product can be used
 *   4. steps         how activation or sign-up works
 *   5. pricing       terms, where cost is a real user question
 *   6. conditions    important things to know, BEFORE the FAQ
 *   7. security      security and control
 *   8. faq           genuine conversion blockers
 *   9. ctaBand       repeat the single primary action
 *
 * `spotlight` is available for pages that need to explain a feature in depth.
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
import Features from './Features'
import TrustBar from './TrustBar'
import UseCases from './UseCases'
import Steps from './Steps'
import Spotlight from './Spotlight'
import Pricing from './Pricing'
import Conditions from './Conditions'
import Security from './Security'
import FAQ from './FAQ'
import CtaBand from './CtaBand'

export const SECTIONS = {
  hero: Hero,
  features: Features,
  trustBar: TrustBar,
  useCases: UseCases,
  steps: Steps,
  spotlight: Spotlight,
  pricing: Pricing,
  conditions: Conditions,
  security: Security,
  faq: FAQ,
  ctaBand: CtaBand,
}

export const SECTION_TYPES = Object.keys(SECTIONS)
