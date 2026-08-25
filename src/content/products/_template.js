import { brand, nav, footer } from '../brand'

/**
 * Blank product page, in the Billease narrative order from DESIGN-RULES.md
 * section 10. Copy this file, rename it, set a slug, fill in the copy, then
 * register it in `src/content/index.js`.
 *
 * Every section is optional, but keep the ORDER. It answers the user's
 * questions in the sequence they ask them: what is this, why should I care,
 * where can I use it, what happens next, what should I know, is it safe,
 * what else, what do I do now.
 *
 * Delete what the product does not need. Do not add sections to make the page
 * feel longer, and do not move important conditions into the FAQ.
 */
export default {
  slug: 'new-product',
  name: 'New product',

  meta: {
    title: 'Product name | Billease',
    description: 'One sentence a search result can show. Around 155 characters.',
  },

  brand,
  nav,   // or override: { ...nav, links: [...] }

  sections: [
    {
      // 1. What this is, and the single action to take
      type: 'hero',
      layout: 'split',                  // 'split' | 'centered'
      background: 'default',            // 'default' | 'subtle' | 'dark' | 'brand'
      badge: { label: '' },             // optional
      title: '',                        // benefit-led, not a feature name
      description: '',
      ctas: [{ label: '', href: '#get-started' }],   // one primary action
      note: '',
      highlights: [{ label: '', icon: 'tick' }],
      media: { src: null, label: 'Product visual', ratio: '4 / 5' },
    },

    {
      // 1b. Trust, where it gates the decision. Real figures only, or delete.
      type: 'trustBar',
      items: [{ icon: 'star', value: '', label: '' }],
      badges: [{ name: 'SEC', src: null }],
      note: '',
    },

    {
      // 2. Key benefits — three or four at most
      id: 'benefits',
      type: 'features',
      eyebrow: '',
      title: '',
      columns: 3,                        // 2 | 3 | 4
      items: [{ icon: 'wallet', title: '', description: '' }],
    },

    {
      // 3. Where and how the product can be used — confirmed cases only
      id: 'use-cases',
      type: 'useCases',
      eyebrow: '',
      title: '',
      items: [{ icon: 'store', title: '', description: '' }],
    },

    {
      // 4. How activation or sign-up works — never imply instant if it is not
      id: 'how-it-works',
      type: 'steps',
      eyebrow: '',
      title: '',
      description: '',
      items: [{ title: '', description: '' }],
    },

    {
      // 5. Terms, where cost is a genuine user question. Delete otherwise.
      id: 'terms',
      type: 'pricing',
      eyebrow: '',
      title: '',
      description: '',
      plans: [
        {
          name: '',
          price: '',
          unit: '',
          description: '',
          badge: '',
          featured: false,
          features: [''],
          cta: { label: '', href: '#get-started' },
        },
      ],
      note: 'Regulatory disclosure approved by Legal goes here.',
    },

    {
      // 6. Important things to know — MUST appear before the FAQ
      id: 'conditions',
      type: 'conditions',
      eyebrow: '',
      title: 'Important things to know',
      description: '',
      items: [{ icon: 'document', title: '', detail: '' }],
    },

    {
      // 7. Security and control — only capabilities that actually exist
      type: 'security',
      eyebrow: '',
      title: '',
      items: [{ icon: 'security', title: '', description: '' }],
    },

    {
      // 8. FAQ — genuine conversion blockers, not filler
      id: 'faq',
      type: 'faq',
      background: 'subtle',
      eyebrow: '',
      title: '',
      items: [{ question: '', answer: '' }],
      footerLink: { text: '', label: '', href: '#' },
    },

    {
      // 9. Repeat the single primary action
      id: 'get-started',
      type: 'ctaBand',
      background: 'brand',
      title: '',
      description: '',
      ctas: [{ label: '', href: '' }],
      stores: [{ name: 'App Store', href: '#' }, { name: 'Google Play', href: '#' }],
      note: '',
    },

    // Available but not part of the default narrative:
    // { type: 'spotlight', rows: [{ title: '', description: '', bullets: [''], media: {} }] }
  ],

  footer,
}
