import { brand, nav, footer } from '../brand'

/**
 * Second example, deliberately short. A page does not have to use every
 * section: this one is hero, benefits, how it works, conditions, FAQ and CTA.
 *
 * FINANCIAL GUARDRAIL: see DESIGN-RULES.md section 16. Unconfirmed values stay
 * marked CONTENT DEPENDENCY.
 */
export default {
  slug: 'cash-loan',
  name: 'Cash loan',

  meta: {
    title: 'Cash loan | Billease',
    description: 'Borrow what you need and repay in fixed monthly instalments.',
  },

  brand,
  nav: {
    ...nav,
    links: [
      { label: 'Benefits', href: '#benefits' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'FAQ', href: '#faq' },
    ],
  },

  sections: [
    {
      type: 'hero',
      layout: 'centered',
      background: 'subtle',
      title: 'Cash in your account, repaid on your schedule',
      description: 'Apply in the app and repay in fixed monthly instalments.',
      ctas: [{ label: 'Apply now', href: '#get-started' }],
      note: 'Subject to credit assessment.',
      media: { src: null, label: 'Loan screen', ratio: '16 / 9' },
    },
    {
      id: 'benefits',
      type: 'features',
      eyebrow: 'Why Billease',
      title: 'What you get',
      columns: 3,
      variant: 'plain',
      items: [
        { icon: 'cash', title: 'A limit that fits you', description: 'CONTENT DEPENDENCY: confirm limit range with Product before publishing.' },
        { icon: 'calendar-outline', title: 'Fixed due dates', description: 'The same amount on the same day each month.' },
        { icon: 'repayment', title: 'Early repayment', description: 'CONTENT DEPENDENCY: confirm early repayment terms.' },
      ],
    },
    {
      id: 'how-it-works',
      type: 'steps',
      eyebrow: 'How it works',
      title: 'From application to payout',
      items: [
        { title: 'Apply in the app', description: 'You need one valid ID and your bank or e-wallet details.' },
        { title: 'We assess your application', description: 'CONTENT DEPENDENCY: confirm how long a decision takes.' },
        { title: 'Funds reach your account', description: 'CONTENT DEPENDENCY: confirm payout timing with Product.' },
      ],
    },
    {
      type: 'conditions',
      eyebrow: 'Before you apply',
      title: 'Important things to know',
      items: [
        { icon: 'document', title: 'Interest and fees', detail: 'CONTENT DEPENDENCY: confirm the full cost structure with Risk and Legal.' },
        { icon: 'cash', title: 'Repayment', detail: 'CONTENT DEPENDENCY: confirm the repayment schedule and what happens if a payment is late.' },
        { icon: 'user', title: 'Who can apply', detail: 'CONTENT DEPENDENCY: confirm eligibility criteria with Risk.' },
      ],
    },
    {
      id: 'faq',
      type: 'faq',
      title: 'Common questions',
      background: 'subtle',
      items: [
        { question: 'Who can apply?', answer: 'CONTENT DEPENDENCY: confirm eligibility criteria with Risk.' },
        { question: 'How long does approval take?', answer: 'CONTENT DEPENDENCY: confirm approval timing with Product.' },
      ],
    },
    {
      id: 'get-started',
      type: 'ctaBand',
      background: 'dark',
      title: 'Apply in a few minutes',
      description: 'You will need one valid ID and your bank or e-wallet details.',
      ctas: [{ label: 'Start application', href: 'https://app.billease.ph' }],
    },
  ],

  footer,
}
