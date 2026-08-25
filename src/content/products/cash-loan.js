import { brand, nav, footer } from '../brand'

/**
 * Second example, kept deliberately short. It shows that a product page does
 * not have to use every section: this one is hero, features, FAQ and CTA only.
 */
export default {
  slug: 'cash-loan',
  name: 'Cash loan',

  meta: {
    title: 'Cash loan | Billease',
    description: 'Borrow what you need and repay in fixed monthly instalments.',
  },

  brand,
  nav: { ...nav, links: [{ label: 'Features', href: '#features' }, { label: 'FAQ', href: '#faq' }] },

  sections: [
    {
      type: 'hero',
      layout: 'centered',
      background: 'subtle',
      title: 'Cash in your account, repaid on your schedule',
      description: 'Apply in the app, get a decision the same day and repay in fixed monthly instalments.',
      ctas: [{ label: 'Apply now', href: '#get-started' }],
      note: 'Subject to credit assessment.',
      media: { src: null, label: 'Loan screen', ratio: '16 / 9' },
    },
    {
      id: 'features',
      type: 'features',
      title: 'What you get',
      columns: 3,
      variant: 'plain',
      items: [
        { icon: 'cash', title: 'Up to ₱30,000', description: 'Your limit depends on your assessment and repayment history.' },
        { icon: 'calendar-outline', title: 'Fixed due dates', description: 'The same amount on the same day each month.' },
        { icon: 'repayment', title: 'Early repayment', description: 'Settle the balance any time with no extra cost.' },
      ],
    },
    {
      id: 'faq',
      type: 'faq',
      title: 'Before you apply',
      background: 'subtle',
      items: [
        { question: 'Who can apply?', answer: 'Filipino citizens aged 21 and above with a valid ID and a source of income.' },
        { question: 'How long does approval take?', answer: 'Most applications get a decision the same day.' },
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
