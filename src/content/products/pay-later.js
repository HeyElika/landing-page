import { brand, nav, footer } from '../brand'

/**
 * Example product page, following the Billease narrative in DESIGN-RULES.md
 * section 10: hero, benefits, use cases, how it works, terms, important
 * things to know, security, FAQ, final call to action.
 *
 * FINANCIAL GUARDRAIL: every rate, fee, limit, timing and merchant claim is a
 * placeholder marked CONTENT DEPENDENCY. Do not replace one with a guess. Get
 * the figures from Product, Risk and Legal. See DESIGN-RULES.md section 16.
 */
export default {
  slug: 'pay-later',
  name: 'Pay later',

  meta: {
    title: 'Pay later with Billease',
    description: 'Split a purchase into monthly instalments and pay at your own pace.',
  },

  brand,
  nav: {
    ...nav,
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Benefits', href: '#benefits' },
      { label: 'Terms', href: '#terms' },
      { label: 'FAQ', href: '#faq' },
    ],
  },

  sections: [
    {
      type: 'hero',
      layout: 'split',
      title: 'Split a purchase into easy monthly payments',
      description:
        'Shop at partner stores and pay over time. No credit card needed.',
      ctas: [{ label: 'Get started', href: '#get-started' }],
      note: 'Subject to credit assessment.',
      highlights: [
        { label: 'No credit card', icon: 'tick' },
        { label: 'Fixed monthly amount', icon: 'tick' },
      ],
      media: { src: null, label: 'App screen', ratio: '4 / 5' },
    },

    {
      id: 'benefits',
      type: 'features',
      eyebrow: 'Why Billease',
      title: 'Built for how Filipinos actually pay',
      columns: 4,
      items: [
        { icon: 'installment-outline', title: 'Flexible terms', description: 'Choose your term at checkout and see the full cost before you confirm.' },
        { icon: 'wallet', title: 'One place to pay', description: 'Every instalment, due date and receipt in a single dashboard.' },
        { icon: 'auto-debit', title: 'Auto debit', description: 'Link a bank account or e-wallet so you never miss a due date.' },
        { icon: 'security', title: 'Bank level security', description: 'Your data is encrypted and never sold to third parties.' },
      ],
    },

    {
      type: 'useCases',
      eyebrow: 'Where you can use it',
      title: 'Shop online or in store',
      items: [
        { icon: 'store', title: 'Partner stores', description: 'Choose Billease at checkout with participating merchants.' },
        { icon: 'phone', title: 'In the app', description: 'Pay in store using the QR code in your Billease app.' },
        { icon: 'bill', title: 'CONTENT DEPENDENCY', description: 'Confirm with Product which other use cases are supported.' },
      ],
      note: 'Only list use cases Product has confirmed are live.',
    },

    {
      id: 'how-it-works',
      type: 'steps',
      eyebrow: 'How it works',
      title: 'Three steps from checkout to done',
      items: [
        { title: 'Create your account', description: 'Sign up with a valid ID to get your limit.' },
        { title: 'Shop and choose Billease', description: 'Pick Billease at checkout, or pay in store with your QR code.' },
        { title: 'Pay in instalments', description: 'Pay the down payment, then a fixed amount each month.' },
      ],
    },

    {
      id: 'terms',
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
          description: 'A middle option.',
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
      note: 'Representative example only. Replace with the figures and disclosure approved by Legal before this page goes live.',
    },

    {
      type: 'conditions',
      eyebrow: 'Before you start',
      title: 'Important things to know',
      description: 'These apply to every purchase, so they belong here rather than buried in the FAQ.',
      items: [
        { icon: 'cash', title: 'How repayment works', detail: 'CONTENT DEPENDENCY: confirm down payment, schedule and repayment mechanics with Product.' },
        { icon: 'document', title: 'Fees and interest', detail: 'CONTENT DEPENDENCY: confirm the fee and interest structure with Risk and Legal.' },
        { icon: 'clock', title: 'Approval time', detail: 'CONTENT DEPENDENCY: confirm how long a decision actually takes. Do not imply instant approval.' },
        { icon: 'card', title: 'Spending limit', detail: 'CONTENT DEPENDENCY: confirm how limits are set and when they change.' },
      ],
    },

    {
      type: 'security',
      eyebrow: 'Security',
      title: 'You stay in control',
      items: [
        { icon: 'security', title: 'Encrypted end to end', description: 'CONTENT DEPENDENCY: confirm the exact security claim with Engineering.' },
        { icon: 'lock', title: 'Your data stays yours', description: 'CONTENT DEPENDENCY: confirm the data handling statement with Legal.' },
        { icon: 'chat-outline', title: 'Real support', description: 'Talk to a person in the app when something looks wrong.' },
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
        { question: 'What happens if I pay late?', answer: 'CONTENT DEPENDENCY: confirm late payment terms with Risk and Legal.' },
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
