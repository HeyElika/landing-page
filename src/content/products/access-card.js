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
 *  - RULE EXCEPTION, approved by Eliso on 2026-08-26: the "Important things to
 *    know" section and the closing CTA band were removed at their request.
 *    DESIGN-RULES.md section 16 says important conditions must not live only
 *    inside the FAQ, so fees, limits and timing are now carried by the FAQ
 *    alone. Restore the conditions section before this page goes to Legal.
 *
 * Surface rhythm alternates white, tinted, white, tinted, white, dark, tinted,
 * brand. Cards are flat and borderless, so each one needs a band tone
 * different from its own fill — that is the pattern the reference pages use.
 *
 * CTA placement is the sticky header, the hero, and the mobile sticky bar.
 * With the closing band removed there is no in-page anchor left, so every
 * activation action links straight to the app.
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
      { label: 'How it works', href: '#how-it-works' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: { label: 'Activate card', href: 'https://app.billease.ph' },
  },

  // Mobile only, and the same action as the hero. Not a fourth CTA.
  stickyCta: { label: 'Activate card', href: 'https://app.billease.ph' },

  sections: [
    {
      type: 'hero',
      layout: 'split',
      fit: 'viewport',   // the card render must not be cut off at the fold
      title: ['Your Billease limit,', 'now on a card'],
      description:
        'Activate your Access Card and use your existing Billease limit online and in store.',
      ctas: [{ label: 'Activate card', href: 'https://app.billease.ph' }],
      note: 'No new application. Ready in up to 24 hours.',
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
      fit: 'viewport',        // one screen, three identical cards
      columns: 3,
      items: [
        {
          media: { src: null, label: 'Card in the app', ratio: '1 / 1' },
          title: 'Use the limit you already have',
          description: 'CONTENT DEPENDENCY: confirm with Product that no separate credit application is needed.',
        },
        {
          media: { src: null, label: 'Paying in store', ratio: '1 / 1' },
          title: 'Spend in more places',
          description: 'CONTENT DEPENDENCY: confirm where the card is accepted before describing wider acceptance.',
        },
        {
          media: { src: null, label: 'Repayment screen', ratio: '1 / 1' },
          title: 'Keep repayment familiar',
          description: 'CONTENT DEPENDENCY: confirm that repayment behaves like the existing Billease experience.',
        },
      ],
    },

    {
      id: 'how-it-works',
      type: 'stepsSplit',
      fit: 'viewport',   // hold the section to one screen, as the hero does
      title: 'Activate your card in a few steps',
      media: { src: null, label: 'App screen', ratio: '4 / 5' },
      steps: [
        {
          title: 'Open your Billease app',
          description: 'Log in with your existing account, no new sign-up needed.',
        },
        {
          title: 'Click Scan QR',
          description: "You'll find it on your account home screen.",
        },
        {
          title: 'Scan the QR code on the back of your card',
          description: "Same code, this time inside the app. It's single-use, so this finishes the bind.",
        },
        {
          title: 'Set up your 4-digit card PIN',
          description: 'Last step, then your card is ready to use.',
        },
      ],
    },

    {
      // Intro with a visual, then the supporting points below a rule. Control
      // and security stay one section: split in two they said the same thing
      // twice. No CTA here — the action belongs to the header and the hero.
      type: 'security',
      background: 'subtle',
      title: 'Safe by default, and in your control',
      description: 'Get notified when your card is used, manage it from the Billease app, and act quickly if something doesn\u2019t look right.',
      media: { src: null, label: 'Security visual', ratio: '4 / 3' },
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
      groups: [
        {
          label: 'Getting started',
          items: [
            {
              question: 'Do I need to apply again?',
              answer: 'No. Activating uses the Billease limit you already have, so there is no new application.',
            },
            { question: 'Does activating cost anything?', answer: 'CONTENT DEPENDENCY: confirm with Product and Legal, then state it plainly.' },
            {
              question: 'How long until I can use the card?',
              answer: 'Activation can take up to 24 hours after you finish your steps. We notify you when it is ready.',
            },
            {
              question: 'Do I need to do anything while I wait?',
              answer: 'No. Once you have completed your steps there is nothing else to do.',
            },
            { question: 'What if my activation does not go through?', answer: 'CONTENT DEPENDENCY: confirm the failure path and what the user should do.' },
          ],
        },
        {
          label: 'Using your card',
          items: [
            {
              question: 'Where can I use the card?',
              answer: 'Online and in store. CONTENT DEPENDENCY: confirm the card network and the exact acceptance wording.',
            },
            { question: 'Can I use it abroad?', answer: 'CONTENT DEPENDENCY: confirm international acceptance and any related fees.' },
            { question: 'Can I add it to a digital wallet?', answer: 'CONTENT DEPENDENCY: confirm whether Apple Pay and Google Pay are supported.' },
            { question: 'Is there a physical card, or is it digital only?', answer: 'CONTENT DEPENDENCY: confirm which forms of the card exist and how a physical one is delivered.' },
          ],
        },
        {
          label: 'Payments and fees',
          items: [
            { question: 'How does repayment work?', answer: 'CONTENT DEPENDENCY: confirm the repayment schedule and whether it matches the existing Billease experience.' },
            { question: 'Are there fees for using the card?', answer: 'CONTENT DEPENDENCY: confirm the fee structure with Risk and Legal.' },
            { question: 'How does the card use my limit?', answer: 'CONTENT DEPENDENCY: confirm whether spending draws on the Billease limit, a balance, or both.' },
            { question: 'Is there a limit per transaction?', answer: 'CONTENT DEPENDENCY: confirm any per transaction or daily limits.' },
            { question: 'Where do I see my transactions?', answer: 'CONTENT DEPENDENCY: confirm where card activity appears in the app.' },
          ],
        },
        {
          label: 'Security and control',
          items: [
            { question: 'Can I freeze my card?', answer: 'CONTENT DEPENDENCY: confirm whether freeze and unfreeze exist before claiming it.' },
            { question: 'What should I do if I lose my card?', answer: 'CONTENT DEPENDENCY: confirm the lost and stolen process and the fastest way to report it.' },
            { question: 'How is my card protected?', answer: 'CONTENT DEPENDENCY: confirm the exact protection claim with Engineering and Risk.' },
            {
              question: 'How do I get help?',
              answer: 'Contact support in the Billease app. That is the fastest route if something does not look right.',
            },
          ],
        },
      ],
    },

  ],

  footer,
}
