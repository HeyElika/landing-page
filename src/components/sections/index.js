/**
 * Section registry.
 *
 * The `type` key in a product content file maps to a component here. To add a
 * new section type: build the component in this folder, register it below, and
 * document its content keys in README.md. Nothing else needs to change.
 */
import Hero from './Hero'
import LogoStrip from './LogoStrip'
import Features from './Features'
import Steps from './Steps'
import Spotlight from './Spotlight'
import Stats from './Stats'
import Pricing from './Pricing'
import Testimonials from './Testimonials'
import FAQ from './FAQ'
import CtaBand from './CtaBand'

export const SECTIONS = {
  hero: Hero,
  logoStrip: LogoStrip,
  features: Features,
  steps: Steps,
  spotlight: Spotlight,
  stats: Stats,
  pricing: Pricing,
  testimonials: Testimonials,
  faq: FAQ,
  ctaBand: CtaBand,
}

export const SECTION_TYPES = Object.keys(SECTIONS)
