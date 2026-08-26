import { brand, nav, footer } from '../brand'

/**
 * Access Card activation page.
 *
 * This is a decision page for an existing eligible Billease user, not an
 * acquisition page. It answers, in order: why activate, where the card works,
 * what activation involves, what to know first, what control you have, and how
 * to activate.
 *
 * Architecture notes, so the trimming is not undone by accident:
 *  - No trust or social-proof strip. Ratings and regulator marks belong on an
 *    acquisition page; regulatory detail sits in the footer.
 *  - No "inside the app" product tour. It does not affect the activation
 *    decision.
 *  - Control and security are one section, not two. Split across a panel and a
 *    band they said the same thing twice.
 *  - "Important things to know" stays on the page, above the FAQ.
 *
 * Surface rhythm alternates white, tinted, white, tinted, white, dark, tinted,
 * brand. Cards are flat and borderless, so each one needs a band tone
 * different from its own fill — that is the pattern the reference pages use.
 *
 * CTA placement is exactly three: sticky header, hero, closing band, plus the
 * mobile sticky bar which carries the same action rather than adding a new one.
 *
 * FINANCIAL GUARDRAIL: DESIGN-RULES.md section 16 forbids inventing activation
 * timing, fees, limits, acceptance or security capabilities. Anything
 * unconfirmed stays marked CONTENT DEPENDENCY and visible.
 */
export default {
  slug: 'access-card',
  name: 'Access Card',

  meta: {
    title: 'Activate your Billease Access Card',
    description: 'Activate your Access Card and spend the Billease limit you already have.',
  },

  brand,
  nav: {
    ...nav,
    links: [
      { label: 'Why activate', href: '#benefits' },
      { label: 'Where to use', href: '#use-cases' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Good to know', href: '#conditions' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: { label: 'Activate card', href: '#activate' },
  },

  // Mobile only, and the same action as the hero. Not a fourth CTA.
  stickyCta: { label: 'Activate card', href: '#activate' },

  sections: [
    {
      type: 'hero',
      layout: 'split',
      fit: 'viewport',   // the card render must not be cut off at the fold
      title: ['Your Billease limit,', 'now on a card'],
      description:
        'Activate your Access Card and use your existing Billease limit online and in store.',
      ctas: [{ label: 'Activate card', href: '#activate' }],
      // The activation-cost question is tracked in the FAQ, not in the hero:
      // an unresolved marker directly under the primary action undermines it.
      highlights: [
        { label: 'No new application required', icon: 'tick' },
        { label: 'Activation may take up to 24 hours', icon: 'clock' },
      ],
      media: {
        src: '/access-card.jpg',
        alt: 'Three Billease Access Cards',
        // The source is 1060x1484. Matching it exactly rather than rounding to
        // 3/4 avoids object-fit cropping roughly 5% off the sides.
        ratio: '1060 / 1484',
      },
      // No tinted panel behind it: the photograph carries its own background,
      // and a tint would read as a box inside a box.
      mediaBackdrop: 'none',
    },

    {
      // Reasons to act, not a restatement of the hero.
      id: 'benefits',
      type: 'features',
      title: 'What the card gives you',
      background: 'subtle',   // white cards need a tinted band to sit on
      columns: 3,
      items: [
        {
          icon: 'card',
          title: 'Use the limit you already have',
          description: 'CONTENT DEPENDENCY: confirm with Product that no separate credit application is needed.',
        },
        {
          icon: 'store',
          title: 'Spend in more places',
          description: 'CONTENT DEPENDENCY: confirm where the card is accepted before describing wider acceptance.',
        },
        {
          icon: 'installment-outline',
          title: 'Keep repayment familiar',
          description: 'CONTENT DEPENDENCY: confirm that repayment behaves like the existing Billease experience.',
        },
      ],
    },

    {
      // Concrete acceptance, not product language. "In the app" was dropped:
      // the card is not meaningfully used in the app, so it was filler.
      id: 'use-cases',
      type: 'useCases',
      title: 'Online and in store',
      items: [
        {
          icon: 'store',
          title: 'In store',
          description: 'CONTENT DEPENDENCY: confirm in-store acceptance and whether contactless is supported.',
        },
        {
          icon: 'phone',
          title: 'Online',
          description: 'CONTENT DEPENDENCY: confirm online acceptance.',
        },
        {
          icon: 'card',
          title: 'International use',
          description: 'CONTENT DEPENDENCY: confirm whether the card works abroad and any currency or fee implications. Remove this card if it is not supported.',
        },
      ],
    },

    {
      id: 'how-it-works',
      type: 'steps',
      title: 'Your part takes just a few minutes',
      background: 'subtle',
      description: 'Once verification is done, there is nothing else for you to do.',
      items: [
        {
          title: 'Complete verification',
          description: 'CONTENT DEPENDENCY: confirm exactly which steps the user completes.',
        },
        {
          title: 'We process the activation',
          description: 'This can take up to 24 hours.',
        },
        {
          title: 'We tell you it is ready',
          description: 'Nothing else to do. We notify you when the card can be used.',
        },
      ],
    },

    {
      // Stays on the page, above the FAQ. Section 16 requires it.
      id: 'conditions',
      type: 'conditions',
      title: 'Important things to know',
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
    },

    {
      // Control and security merged. No CTA here: the action belongs to the
      // header, the hero and the closing band.
      type: 'security',
      title: 'Safe by default, and in your control',
      items: [
        {
          icon: 'security',
          title: 'Protected transactions',
          description: 'CONTENT DEPENDENCY: confirm the exact protection claim with Engineering and Risk.',
        },
        {
          icon: 'lock',
          title: 'Freeze your card',
          description: 'CONTENT DEPENDENCY: confirm whether freeze and unfreeze exist before claiming it.',
        },
        {
          icon: 'chat-outline',
          title: 'Get help quickly',
          description: 'Reach support in the app if something does not look right.',
        },
      ],
    },

    {
      // Grouped, as Klarna does: a few scannable rows rather than a ladder of
      // individual questions. Add questions to a group before adding a group.
      id: 'faq',
      type: 'faq',
      title: 'Frequently asked questions',
      background: 'subtle',
      groups: [
        {
          label: 'Activating your card',
          items: [
            { question: 'Does activating cost anything?', answer: 'CONTENT DEPENDENCY: confirm with Product and Legal, then state it plainly.' },
            { question: 'How long until I can use the card?', answer: 'Activation can take up to 24 hours after you finish your steps. We notify you when it is ready.' },
            { question: 'Do I need to do anything while I wait?', answer: 'No. Once you have completed your steps there is nothing else to do.' },
            { question: 'What if my activation does not go through?', answer: 'CONTENT DEPENDENCY: confirm the failure path and what the user should do.' },
          ],
        },
        {
          label: 'Using your card',
          items: [
            { question: 'Where is the card accepted?', answer: 'CONTENT DEPENDENCY: confirm the card network and where it is accepted online and in store.' },
            { question: 'Can I use it abroad?', answer: 'CONTENT DEPENDENCY: confirm international acceptance and any related fees.' },
          ],
        },
      ],
      footerLink: { text: 'Still deciding?', label: 'Contact support', href: '#' },
    },

    {
      id: 'activate',
      type: 'ctaBand',
      background: 'brand',
      title: 'Ready to activate your card?',
      description: "A few minutes now. We'll let you know as soon as it's ready to use.",
      ctas: [{ label: 'Activate card', href: 'https://app.billease.ph' }],
      note: 'CONTENT DEPENDENCY: confirm any terms that must appear next to the activation action.',
    },
  ],

  footer,
}
