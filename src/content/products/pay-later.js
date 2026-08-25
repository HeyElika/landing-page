import { brand, nav, footer } from '../brand'

/**
 * Example product page.
 *
 * FINANCIAL GUARDRAIL: rates, fees, limits, timings and merchant claims on this
 * page are placeholders marked CONTENT DEPENDENCY or shown as em-less dashes.
 * Do not replace them with guesses. Get the figures from Product, Risk and
 * Legal. See DESIGN-RULES.md section 16.
 *
 * Every other string is placeholder copy: replace it,
 * keep the structure. Reorder `sections` to reorder the page, delete a section
 * object to drop it, or copy one to repeat it.
 */
export default {
  slug: 'pay-later',
  name: 'Pay later',

  meta: {
    title: 'Pay later with Billease',
    description: 'Split any purchase into monthly instalments and pay at your own pace.',
  },

  brand,
  nav,

  sections: [
    {
      type: 'hero',
      layout: 'split',
      badge: { label: 'New for 2026', icon: 'rocket' },
      title: 'Split any purchase into easy monthly payments',
      description:
        'Shop at partner stores and pay over time. No credit card needed.',
      ctas: [
        { label: 'Get started', href: '#get-started' },
        { label: 'See how it works', href: '#how-it-works', icon: 'chevron-right' },
      ],
      note: 'Approval in minutes. Subject to credit assessment.',
      highlights: [
        { label: 'No credit card', icon: 'tick' },
        { label: 'Zero hidden fees', icon: 'tick' },
        { label: 'Partner stores nationwide', icon: 'tick' },
      ],
      media: { src: null, label: 'App screen', ratio: '4 / 5' },
    },

    {
      type: 'logoStrip',
      title: 'Trusted by shoppers at',
      items: [
        { name: 'Lazada' }, { name: 'Shopee' }, { name: 'Zalora' },
        { name: 'Puregold' }, { name: 'Watsons' },
      ],
    },

    {
      id: 'how-it-works',
      type: 'steps',
      eyebrow: 'How it works',
      title: 'Three steps from checkout to done',
      description: 'The whole flow happens inside the app, so there is nothing to print, sign or queue for.',
      items: [
        { title: 'Create your account', description: 'Sign up with a valid ID to get your limit.' },
        { title: 'Shop and choose Billease', description: 'Pick Billease at checkout or pay in store using your QR code.' },
        { title: 'Pay in instalments', description: 'Pay the down payment, then fixed monthly payments.' },
      ],
      cta: { label: 'Read the full guide', href: '#faq' },
    },

    {
      id: 'features',
      type: 'features',
      eyebrow: 'Why Billease',
      title: 'Built for how Filipinos actually pay',
      description: 'Every part of the product is designed around cash flow, not credit scores.',
      columns: 3,
      items: [
        { icon: 'installment-outline', title: 'Flexible terms', description: 'Choose your term at checkout and see the exact cost before you confirm.' },
        { icon: 'wallet', title: 'One place to pay', description: 'Track every instalment, due date and receipt in a single dashboard.' },
        { icon: 'security', title: 'Bank level security', description: 'Your data is encrypted end to end and never sold to third parties.' },
        { icon: 'auto-debit', title: 'Auto debit', description: 'Link a bank account or e-wallet and never miss a due date.' },
        { icon: 'store', title: 'Partner stores', description: 'Online and in store, from groceries to gadgets.' },
        { icon: 'chat-outline', title: 'Real support', description: 'Talk to a person in the app, seven days a week.' },
      ],
    },

    {
      type: 'spotlight',
      eyebrow: 'Inside the app',
      title: 'Everything you need, nothing you do not',
      rows: [
        {
          title: 'Know your cost before you commit',
          description: 'The checkout screen shows the full schedule up front, including every fee.',
          bullets: ['Full payment schedule before you confirm', 'Fixed monthly amount', 'CONTENT DEPENDENCY: confirm early-payment terms'],
          link: { label: 'See a sample schedule', href: '#pricing' },
          media: { src: null, label: 'Checkout screen', ratio: '4 / 3' },
        },
        {
          title: 'Stay on top of every due date',
          description: 'Reminders land three days before each payment, and auto debit handles the rest.',
          bullets: ['Push and SMS reminders', 'Auto debit from bank or e-wallet', 'Payment history you can export'],
          media: { src: null, label: 'Payments screen', ratio: '4 / 3' },
        },
      ],
    },

    {
      type: 'stats',
      background: 'dark',
      title: 'Where we are today',
      items: [
        { value: '—', label: 'Approved customers (confirm)' },
        { value: '—', label: 'Partner stores (confirm)' },
        { value: '—', label: 'Maximum limit (confirm)' },
        { value: '—', label: 'App rating (confirm)' },
      ],
    },

    {
      id: 'pricing',
      type: 'pricing',
      eyebrow: 'Terms',
      title: 'Pick the term that fits your budget',
      description: 'CONTENT DEPENDENCY: all figures below are placeholders. Replace with terms confirmed by Product, Risk and Legal.',
      plans: [
        {
          name: '3 months',
          price: '₱0,000',
          unit: '/ month',
          description: 'Shortest term, lowest total cost.',
          features: ['Down payment: confirm', 'Fixed monthly amount', 'Fees: confirm'],
          cta: { label: 'Get started', href: '#get-started' },
        },
        {
          name: '6 months',
          price: '₱0,000',
          unit: '/ month',
          description: 'The balance most customers choose.',
          badge: 'Most picked',
          featured: true,
          features: ['Down payment: confirm', 'Fixed monthly amount', 'Fees: confirm', 'Auto debit available'],
          cta: { label: 'Get started', href: '#get-started' },
        },
        {
          name: '12 months',
          price: '₱0,000',
          unit: '/ month',
          description: 'Smallest monthly payment.',
          features: ['Down payment: confirm', 'Fixed monthly amount', 'Fees: confirm'],
          cta: { label: 'Get started', href: '#get-started' },
        },
      ],
      note: 'Representative example only. Replace with the figures and disclosure approved by legal before this page goes live.',
    },

    {
      type: 'testimonials',
      eyebrow: 'Customers',
      title: 'What people say',
      items: [
        { quote: 'I bought a laptop for online classes and paid it off over six months without touching my savings.', name: 'Marites R.', role: 'Quezon City' },
        { quote: 'Approval took less than ten minutes and the schedule was clear from the start.', name: 'Jomar D.', role: 'Cebu' },
        { quote: 'Auto debit means I stopped worrying about due dates completely.', name: 'Aira S.', role: 'Davao' },
      ],
    },

    {
      id: 'faq',
      type: 'faq',
      eyebrow: 'FAQ',
      title: 'Questions we get a lot',
      background: 'subtle',
      items: [
        { question: 'Do I need a credit card?', answer: 'No. Billease works with a valid ID and a bank account or e-wallet.' },
        { question: 'How fast is approval?', answer: 'CONTENT DEPENDENCY: confirm approval timing with Product before publishing.' },
        { question: 'What happens if I pay late?', answer: 'A late fee applies and it is shown in your schedule before you confirm the purchase. Replace this answer with the approved wording.' },
        { question: 'Can I pay early?', answer: 'CONTENT DEPENDENCY: confirm early settlement terms with Product and Legal.' },
      ],
      footerLink: { text: 'Still need help?', label: 'Visit the help centre', href: '#' },
    },

    {
      id: 'get-started',
      type: 'ctaBand',
      background: 'brand',
      title: 'Start with your first purchase',
      description: 'Download the app, get your limit and shop the same day.',
      ctas: [{ label: 'Create an account', href: 'https://app.billease.ph' }],
      stores: [
        { name: 'App Store', href: '#' },
        { name: 'Google Play', href: '#' },
      ],
      note: 'Subject to credit assessment. Terms and conditions apply.',
    },
  ],

  footer,
}
