import { brand, nav, footer } from '../brand'

/**
 * Blank product page. Copy this file, rename it, set a slug, fill in the copy,
 * then register it in `src/content/index.js`.
 *
 * Every section object is optional. Delete what the product does not need and
 * reorder the rest. Full key reference is in README.md.
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
      type: 'hero',
      layout: 'split',                  // 'split' | 'centered'
      background: 'default',            // 'default' | 'subtle' | 'dark' | 'brand'
      badge: { label: '', icon: '' },   // optional
      title: '',
      description: '',
      ctas: [
        { label: '', href: '#get-started' },
        { label: '', href: '#how-it-works' },
      ],
      note: '',
      highlights: [{ label: '', icon: 'tick' }],
      media: { src: null, label: 'Product image', ratio: '4 / 5' },
    },

    {
      type: 'logoStrip',
      title: '',
      items: [{ name: '' }],
    },

    {
      id: 'how-it-works',
      type: 'steps',
      eyebrow: '',
      title: '',
      description: '',
      items: [{ title: '', description: '' }],
    },

    {
      id: 'features',
      type: 'features',
      eyebrow: '',
      title: '',
      description: '',
      columns: 3,                        // 2 | 3 | 4
      items: [{ icon: 'wallet', title: '', description: '' }],
    },

    {
      type: 'spotlight',
      eyebrow: '',
      title: '',
      rows: [
        {
          title: '',
          description: '',
          bullets: [''],
          link: { label: '', href: '#' },
          media: { src: null, label: 'Feature image', ratio: '4 / 3' },
        },
      ],
    },

    {
      type: 'stats',
      background: 'dark',
      title: '',
      items: [{ value: '', label: '' }],
    },

    {
      id: 'pricing',
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
      note: 'Regulatory disclosure approved by legal goes here.',
    },

    {
      type: 'testimonials',
      eyebrow: '',
      title: '',
      items: [{ quote: '', name: '', role: '' }],
    },

    {
      id: 'faq',
      type: 'faq',
      background: 'subtle',
      eyebrow: '',
      title: '',
      items: [{ question: '', answer: '' }],
      footerLink: { text: '', label: '', href: '#' },
    },

    {
      id: 'get-started',
      type: 'ctaBand',
      background: 'brand',
      title: '',
      description: '',
      ctas: [{ label: '', href: '' }],
      stores: [{ name: 'App Store', href: '#' }, { name: 'Google Play', href: '#' }],
      note: '',
    },
  ],

  footer,
}
