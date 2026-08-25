import { brand, nav, footer } from '../brand'

/**
 * Access Card activation page.
 *
 * Structure follows DESIGN-RULES.md section 11, checked against how comparable
 * card pages are actually built (Wise, Atome, Salmon, monobank, Banco Plata):
 *
 *   hero        product named, one benefit-led claim, one action, card visual
 *   trustBar    rating and regulator marks — trust gates a lending decision
 *   features    3-4 benefits as icon cards, the near-universal pattern
 *   useCases    where the card is accepted
 *   steps       activation in three steps, with honest timing
 *   spotlight   two depth rows showing the app doing the thing
 *   conditions  fees, limits and timing ON the page, before the FAQ
 *   security    short reassurance, three points
 *   faq         real conversion blockers
 *   ctaBand     the same action, worded identically
 *
 * FINANCIAL GUARDRAIL: this page is for an existing eligible user, and section
 * 16 forbids inventing activation timing, fees, limits, acceptance or security
 * capabilities. Everything unconfirmed is marked CONTENT DEPENDENCY and is
 * meant to stay visible until Product, Risk or Legal supply real wording.
 */
export default {
  slug: 'access-card',
  name: 'Access Card',

  meta: {
    title: 'Activate your Billease Access Card',
    description: 'Activate your Access Card and spend your Billease limit where you shop.',
  },

  brand,
  nav: {
    ...nav,
    links: [
      { label: 'Benefits', href: '#benefits' },
      { label: 'Where to use', href: '#use-cases' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Good to know', href: '#conditions' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: { label: 'Activate card', href: '#activate' },
  },

  sections: [
    {
      // Every reference page names the product, makes one benefit-led claim and
      // shows the card. One action only: a second equal CTA splits intent.
      type: 'hero',
      layout: 'split',
      badge: { label: 'Access Card' },
      title: 'Your Billease limit, ready to spend',
      description:
        'Activate your Access Card and pay with the limit you already have. Your part takes a few minutes.',
      ctas: [{ label: 'Activate card', href: '#activate' }],
      note: 'CONTENT DEPENDENCY: confirm whether activation itself creates any charge.',
      highlights: [
        { label: 'No new application', icon: 'tick' },
        { label: 'Ready in up to 24 hours', icon: 'clock' },
      ],
      media: { src: null, label: 'Access Card', ratio: '1.586 / 1' },
      mediaBackdrop: 'brand',
    },

    {
      // Wise leads with a Trustpilot score, Salmon with an App Store rating and
      // BSP/SEC/AMLC seals. Numbers must be real before this ships.
      type: 'trustBar',
      items: [
        { icon: 'star', value: '—', label: 'App rating (confirm)' },
        { icon: 'user', value: '—', label: 'Customers (confirm)' },
      ],
      badges: [
        { name: 'SEC', src: null },
        { name: 'BSP', src: null },
        { name: 'NPC', src: null },
      ],
      note: 'CONTENT DEPENDENCY: supply real figures and the regulator badge files, or delete this section. Never estimate.',
    },

    {
      id: 'benefits',
      type: 'features',
      eyebrow: 'Why activate',
      title: 'What the card gives you',
      description: 'Three things it changes about how you spend.',
      columns: 3,
      items: [
        {
          icon: 'card',
          title: 'One card, your existing limit',
          description: 'CONTENT DEPENDENCY: confirm exactly how the card draws on the Billease limit.',
        },
        {
          icon: 'store',
          title: 'Pay in more places',
          description: 'CONTENT DEPENDENCY: confirm where the card is accepted before making this claim.',
        },
        {
          icon: 'installment-outline',
          title: 'The repayment you already know',
          description: 'CONTENT DEPENDENCY: confirm repayment behaviour with Product.',
        },
      ],
    },

    {
      id: 'use-cases',
      type: 'useCases',
      eyebrow: 'Where you can use it',
      title: 'Online and in store',
      description: 'Only what Product has confirmed the card actually supports.',
      items: [
        { icon: 'store', title: 'In store', description: 'CONTENT DEPENDENCY: confirm in-store acceptance.' },
        { icon: 'phone', title: 'Online', description: 'CONTENT DEPENDENCY: confirm online acceptance.' },
        { icon: 'wallet', title: 'In the app', description: 'CONTENT DEPENDENCY: confirm in-app card use.' },
      ],
    },

    {
      id: 'how-it-works',
      type: 'steps',
      eyebrow: 'How activation works',
      title: 'Three steps, then we take over',
      description:
        'You finish your part in a few minutes. We handle the rest and tell you when the card is ready.',
      items: [
        {
          title: 'Complete verification',
          description: 'CONTENT DEPENDENCY: confirm exactly which steps the user completes.',
        },
        {
          title: 'We process the activation',
          description: 'This can take up to 24 hours. Confirm this timing before launch.',
        },
        {
          title: 'We tell you it is ready',
          description: 'Nothing else to do. We notify you the moment the card can be used.',
        },
      ],
    },

    {
      // Wise and Atome both give the product two depth rows after the summary
      // grid: one on control, one on everyday use.
      type: 'spotlight',
      eyebrow: 'Inside the app',
      title: 'Everything about the card lives in one place',
      rows: [
        {
          title: 'See the card and what it can do',
          description: 'Your card details, limit and recent spending sit on one screen.',
          bullets: [
            'Card details when you need them',
            'CONTENT DEPENDENCY: confirm what limit information is shown',
            'Every transaction in one list',
          ],
          media: { src: null, label: 'Card screen', ratio: '4 / 3' },
        },
        {
          title: 'Stay in control of spending',
          description: 'Notifications as you spend, and the controls to stop a card you no longer trust.',
          bullets: [
            'CONTENT DEPENDENCY: confirm which notifications exist',
            'CONTENT DEPENDENCY: confirm whether freeze and unfreeze exist',
          ],
          media: { src: null, label: 'Card controls', ratio: '4 / 3' },
        },
      ],
    },

    {
      // The differentiator. Wise puts fee caveats inline, monobank puts them in
      // the FAQ, Banco Plata puts the CAT in the footer. Rule 16 says on the
      // page, before the FAQ, which is stricter than any of them.
      id: 'conditions',
      type: 'conditions',
      eyebrow: 'Good to know',
      title: 'Important things to know',
      description: 'These are here rather than in the FAQ, because you should see them before you activate.',
      items: [
        {
          icon: 'clock',
          title: 'Activation can take up to 24 hours',
          detail: 'Your part finishes in minutes; processing on our side can take up to a day. Confirm this timing before launch.',
        },
        {
          icon: 'cash',
          title: 'How the card uses your funds',
          detail: 'CONTENT DEPENDENCY: confirm whether spending draws on the Billease limit, a balance, or both.',
        },
        {
          icon: 'document',
          title: 'Fees and repayment',
          detail: 'CONTENT DEPENDENCY: confirm fees and repayment implications with Risk and Legal.',
        },
        {
          icon: 'card',
          title: 'Spending limits',
          detail: 'CONTENT DEPENDENCY: confirm any per transaction or daily limits.',
        },
      ],
      note: 'Do not move any of this into the FAQ. Section 16 requires important conditions to be visible on the page.',
    },

    {
      type: 'security',
      eyebrow: 'Security',
      title: 'Safe by default, and in your control',
      items: [
        {
          icon: 'security',
          title: 'Protected transactions',
          description: 'CONTENT DEPENDENCY: confirm the exact protection claim with Engineering and Risk.',
        },
        {
          icon: 'lock',
          title: 'Freeze it any time',
          description: 'CONTENT DEPENDENCY: confirm whether card freeze exists before claiming it.',
        },
        {
          icon: 'chat-outline',
          title: 'Reach a person fast',
          description: 'Contact support in the app if something does not look right.',
        },
      ],
    },

    {
      id: 'faq',
      type: 'faq',
      eyebrow: 'FAQ',
      title: 'Before you activate',
      background: 'default',
      items: [
        { question: 'Does activating cost anything?', answer: 'CONTENT DEPENDENCY: confirm with Product and Legal, then state it plainly.' },
        { question: 'How long until I can use the card?', answer: 'Activation can take up to 24 hours after you finish your steps. We notify you when it is ready. Confirm this timing before launch.' },
        { question: 'Do I need to do anything while I wait?', answer: 'No. Once you have completed your steps there is nothing else to do.' },
        { question: 'What if my activation does not go through?', answer: 'CONTENT DEPENDENCY: confirm the failure path and what the user should do.' },
        { question: 'Can I use it abroad?', answer: 'CONTENT DEPENDENCY: confirm international acceptance and any related fees.' },
      ],
      footerLink: { text: 'Still deciding?', label: 'Contact support', href: '#' },
    },

    {
      id: 'activate',
      type: 'ctaBand',
      background: 'brand',
      title: 'Ready to activate your card?',
      description: 'A few minutes now. We will let you know as soon as it is ready to use.',
      ctas: [{ label: 'Activate card', href: 'https://app.billease.ph' }],
      note: 'CONTENT DEPENDENCY: confirm any terms that must appear next to the activation action.',
    },
  ],

  footer,
}
