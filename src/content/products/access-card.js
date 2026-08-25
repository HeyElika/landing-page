import { brand, nav, footer } from '../brand'

/**
 * Access Card activation page, built to DESIGN-RULES.md section 11.
 *
 * This page is for an EXISTING eligible Billease user, not an acquisition
 * page. It answers, in order: why activate, what can I do with it, what
 * happens when I activate, what should I know, is it safe, what next.
 *
 * FINANCIAL GUARDRAIL: section 11 is explicit that activation timing, fees,
 * limits, card acceptance and security capabilities must not be invented.
 * Everything unconfirmed below is marked CONTENT DEPENDENCY and is meant to
 * stay visible until Product, Risk or Legal supply the real wording.
 *
 * The 24 hour processing language required by section 11 is included as a
 * placeholder because it is stated in the rules, but confirm it before launch
 * rather than assuming it is still current.
 */
export default {
  slug: 'access-card',
  name: 'Access Card',

  meta: {
    title: 'Activate your Billease Access Card',
    description: 'Activate your Access Card and use your Billease limit where you shop.',
  },

  brand,
  nav: {
    ...nav,
    links: [
      { label: 'What you can do', href: '#use-cases' },
      { label: 'How activation works', href: '#how-it-works' },
      { label: 'Good to know', href: '#conditions' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: { label: 'Activate card', href: '#activate' },
  },

  sections: [
    {
      type: 'hero',
      layout: 'split',
      badge: { label: 'Access Card' },
      title: 'Use your Billease limit where you shop',
      description:
        'Activate your Access Card to pay with your existing Billease limit. Activation takes a few minutes on your side.',
      ctas: [{ label: 'Activate card', href: '#activate' }],
      note: 'CONTENT DEPENDENCY: confirm whether activation itself creates any charge.',
      media: { src: null, label: 'Access Card visual', ratio: '4 / 3' },
    },

    {
      id: 'benefits',
      type: 'features',
      eyebrow: 'Why activate',
      title: 'What the Access Card gives you',
      columns: 3,
      items: [
        { icon: 'card', title: 'One card, your existing limit', description: 'CONTENT DEPENDENCY: confirm exactly how the card draws on the Billease limit.' },
        { icon: 'wallet', title: 'Pay in more places', description: 'CONTENT DEPENDENCY: confirm where the card is accepted before making this claim.' },
        { icon: 'installment-outline', title: 'Same repayment you know', description: 'CONTENT DEPENDENCY: confirm repayment behaviour with Product.' },
      ],
    },

    {
      id: 'use-cases',
      type: 'useCases',
      eyebrow: 'Where you can use it',
      title: 'What you can pay for',
      items: [
        { icon: 'store', title: 'In store', description: 'CONTENT DEPENDENCY: confirm in-store acceptance.' },
        { icon: 'phone', title: 'Online', description: 'CONTENT DEPENDENCY: confirm online acceptance.' },
      ],
      note: 'Only list a use case once Product has confirmed the card actually supports it.',
    },

    {
      id: 'how-it-works',
      type: 'steps',
      eyebrow: 'How activation works',
      title: 'What happens after you tap activate',
      description: 'You complete your part in a few minutes. Billease handles the rest and tells you when the card is ready.',
      items: [
        { title: 'Complete verification', description: 'CONTENT DEPENDENCY: confirm exactly which verification steps the user completes.' },
        { title: 'Billease processes your activation', description: 'This can take up to 24 hours. Confirm this timing with Product before launch.' },
        { title: 'We let you know it is ready', description: 'You do not need to do anything else. We notify you when the card can be used.' },
      ],
    },

    {
      id: 'conditions',
      type: 'conditions',
      eyebrow: 'Good to know',
      title: 'Important things to know',
      description: 'These are here rather than in the FAQ because you should see them before you activate.',
      items: [
        { icon: 'clock', title: 'Activation can take up to 24 hours', detail: 'Your part finishes in minutes, but processing on our side can take up to a day. Confirm this timing before launch.' },
        { icon: 'cash', title: 'How the card uses your funds', detail: 'CONTENT DEPENDENCY: confirm whether spending draws on the Billease limit, a balance, or both.' },
        { icon: 'document', title: 'Fees and repayment', detail: 'CONTENT DEPENDENCY: confirm fees and repayment implications with Risk and Legal.' },
        { icon: 'card', title: 'Spending limits', detail: 'CONTENT DEPENDENCY: confirm any per transaction or daily limits.' },
      ],
      note: 'Do not move any of this into the FAQ. Section 16 requires important conditions to be visible on the page.',
    },

    {
      type: 'security',
      eyebrow: 'Security',
      title: 'Safe by default, and in your control',
      items: [
        { icon: 'security', title: 'Protected transactions', description: 'CONTENT DEPENDENCY: confirm the exact protection claim with Engineering and Risk.' },
        { icon: 'lock', title: 'Freeze it any time', description: 'CONTENT DEPENDENCY: confirm whether card freeze exists before claiming it.' },
        { icon: 'chat-outline', title: 'Report a problem fast', description: 'Reach support in the app if something does not look right.' },
      ],
    },

    {
      id: 'faq',
      type: 'faq',
      eyebrow: 'FAQ',
      title: 'Before you activate',
      background: 'subtle',
      items: [
        { question: 'Does activating cost anything?', answer: 'CONTENT DEPENDENCY: confirm with Product and Legal, then state it plainly.' },
        { question: 'How long until I can use the card?', answer: 'Activation can take up to 24 hours after you finish your steps. We notify you when it is ready. Confirm this timing before launch.' },
        { question: 'Do I need to do anything while I wait?', answer: 'No. Once you have completed your steps there is nothing else to do.' },
        { question: 'What if my activation does not go through?', answer: 'CONTENT DEPENDENCY: confirm the failure path and what the user should do.' },
      ],
      footerLink: { text: 'Need help?', label: 'Contact support', href: '#' },
    },

    {
      id: 'activate',
      type: 'ctaBand',
      background: 'brand',
      title: 'Ready to activate your card?',
      description: 'It takes a few minutes. We will let you know as soon as the card is ready to use.',
      ctas: [{ label: 'Activate card', href: 'https://app.billease.ph' }],
      note: 'CONTENT DEPENDENCY: confirm any terms that must appear next to the activation action.',
    },
  ],

  footer,
}
