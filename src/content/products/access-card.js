import { brand, footer } from '../brand'

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
    // Header is the logo alone. The links and the action are kept here,
    // commented, so restoring them means uncommenting them (and re-importing
    // `nav` from ../brand if the shared defaults are wanted instead).
    //
    // links: [
    //   { label: 'Why activate', href: '#benefits' },
    //   { label: 'How it works', href: '#how-it-works' },
    //   { label: 'FAQ', href: '#faq' },
    // ],
    // cta: { label: 'Open Billease app', href: 'https://app.billease.ph', size: 'xl' },
  },

  // Mobile only, and the same action as the hero. Not a fourth CTA.
  stickyCta: { label: 'Open Billease app', href: 'https://app.billease.ph', size: 'xl' },

  sections: [
    {
      type: 'hero',
      layout: 'split',
      fit: 'viewport',   // the card render must not be cut off at the fold
      title: ['Your Access Card', 'is ready to activate.'],
      description: 'Finish setting it up in just a minute and start using your Billease limit with your card.',
      ctas: [{ label: 'Open Billease app', href: 'https://app.billease.ph', size: 'xl' }],
      note: 'No new application. Ready in up to 24 hours.',
      media: {
        src: '/access-card.jpg',
        alt: 'Three Billease Access Cards',
        // The source is 1060x1484. The slot is deliberately a little wider than
        // that: the box is sized from a fixed height, so a wider ratio is the
        // only way to gain width without gaining height. object-fit takes the
        // difference off the top and bottom, where the photograph has margin
        // to spare.
        ratio: '1060 / 1380',
      },
      // No tinted panel behind it: the photograph carries its own background,
      // and a tint would read as a box inside a box.
      mediaBackdrop: 'none',
    },

    {
      // Reasons to act, not a restatement of the hero.
      id: 'benefits',
      type: 'features',
      // No visible heading: the three cards say what they are, and a heading
      // above them only ate the height the cards want. `label` still names the
      // section for screen readers and for the nav link that points here.
      label: 'What the card gives you',
      fit: 'viewport',        // one screen, three identical cards
      columns: 3,
      items: [
        {
          media: { src: null, label: 'Card in the app', ratio: '2 / 3' },
          title: 'Use the limit you already have',
          description: 'No new limit to manage. Your Access Card uses the Credit Line you already have.',
        },
        {
          media: { src: '/card-in-store.jpg', alt: 'Paying in store by tapping a Billease card on a card terminal', ratio: '2 / 3' },
          title: 'Pay with chip or tap',
          // CONTENT DEPENDENCY: the Mastercard acceptance claim. The supplied
          // copy carried the caveat inside the sentence; a caveat addressed to
          // us does not belong on the page, so it lives here. Confirm the
          // network with Product before this ships.
          description: 'Use your physical card wherever Mastercard is accepted.',
        },
        {
          media: { src: null, label: 'Card ready in the app', ratio: '2 / 3' },
          title: 'Ready once activated',
          description: 'Your card is ready to use as soon as Billease confirms activation.',
        },
      ],
    },

    {
      id: 'how-it-works',
      type: 'stepsSplit',
      reverse: true,   // visual first, steps beside it
      fit: 'viewport',   // hold the section to one screen, as the hero does
      title: 'Activate your card in a few steps.',
      media: {
        src: '/card-in-hand.jpg',
        alt: 'A Billease Access Card held up to the camera',
        ratio: '1 / 1',
      },
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
      title: 'Safe by default, and in your control.',
      description: 'Get notified when your card is used, manage it from the Billease app, and act quickly if something doesn\u2019t look right.',
      media: {
        src: '/app-card-locked.jpg',
        alt: 'The Billease app showing a locked Access Card',
        ratio: '1 / 1',   // the file's own ratio, so nothing is cropped or stretched
      },
      items: [
        {
          // Was 'Protected transactions', which claimed a protection nobody had
          // confirmed. This says only what the app demonstrably does. If
          // Engineering and Risk confirm a specific protection, the stronger
          // title can come back with their wording.
          icon: 'document',
          title: 'Track every transaction',
          description: 'See your card activity in the Billease app and review payments whenever you need to.',
        },
        {
          icon: 'lock',
          title: 'Lock your card',
          description: 'Temporarily lock your card in the Billease app if it\u2019s lost, stolen, or you notice something unusual.',
        },
        {
          icon: 'chat-outline',
          title: 'Get help quickly',
          description: 'Contact Billease support from the app if you don\u2019t recognize a payment or need help with your card.',
        },
      ],
    },

    {
      // Grouped, as Klarna does: a few scannable rows rather than a ladder of
      // individual questions. Add questions to a group before adding a group.
      id: 'faq',
      type: 'faq',
      title: 'Frequently asked questions',
      // A flat list, in the order a reader asks these things: where it works,
      // then what it costs, then what happens when something goes wrong.
      //
      // DRAFT ANSWERS. Written at the user's request in place of the content
      // dependencies that stood here. Each describes how the product behaves
      // and deliberately carries no rate, fee amount or timeframe, because
      // those are the parts nobody has confirmed. Every one still needs a
      // sign-off before launch — the owners are named per answer.
      items: [
        {
          question: 'Where can I use the card?',
          // Verify with Product: the network, and whether acceptance really is
          // both online and in store from day one.
          answer: 'Online and in store, anywhere Mastercard is accepted. It works like any other card at checkout, so you can pay by chip or by tapping.',
        },
        {
          question: 'Can I use it abroad?',
          // Verify with Product and Risk: whether international use is enabled
          // at launch, and how conversion is handled.
          answer: 'The card is built for spending in the Philippines. If you need to pay a merchant based overseas, check the Billease app first. Support can tell you whether that purchase will go through.',
        },
        {
          question: 'Are there fees for using the card?',
          // Verify with Risk and Legal. This says only that the card does not
          // introduce a separate fee structure; it makes no claim about the
          // Credit Line's own charges, which belong in the T&Cs.
          answer: 'Your Access Card does not add a separate set of charges. What you pay follows the terms of the Billease Credit Line you already have, and you can see the full breakdown in the app before you confirm a purchase.',
        },
        {
          question: 'How does repayment work?',
          // Verify with Product: that card purchases really do fall under the
          // existing Credit Line schedule rather than a separate one.
          answer: 'Exactly as it does today. Card purchases draw on your existing Billease Credit Line and appear alongside your other transactions, so you repay them on the same schedule, in the same place in the app.',
        },
        {
          question: 'What should I do if I lose my card?',
          // Verify with Ops: the replacement process, and whether locking is
          // the correct first step in the lost and stolen flow.
          answer: 'Lock the card in the Billease app straight away, which stops it being used while you look for it. If it does not turn up, contact Billease support from the app to report it and arrange a replacement.',
        },
        {
          question: 'How is my card protected?',
          // Verify with Engineering and Risk before adding anything stronger.
          // This claims only what the app visibly does.
          answer: 'You can see every card transaction in the Billease app as it happens, and lock the card yourself at any time. If a payment appears that you do not recognise, lock the card and contact support from the app.',
        },
      ],
    },

    {
      // Sits between the FAQ and the footer: the last thing on the page is
      // getting the app, which is where activation actually happens.
      type: 'appDownload',
      title: 'Get the Billease app',
      description: 'Download Billease from the App Store or Google Play and sign in to get started.',
      media: {
        src: '/billease-app-icon.png',
        alt: 'The Billease app icon',
        ratio: '1 / 1',
      },
      apps: [
        // Official badge artwork, taken from Apple's and Google's own brand
        // resources. Both stores require their own badge and forbid redrawing
        // it, so these files are used as supplied.
        {
          name: 'Download on the App Store',
          href: 'https://apps.apple.com/ph/app/billease-buy-now-pay-later/id1484485168',
          src: '/badge-app-store.svg',
        },
        {
          name: 'Get it on Google Play',
          href: 'https://play.google.com/store/apps/details?id=ph.billeasev2.mobile&gl=ph',
          src: '/badge-google-play.png',
        },
      ],
    },

  ],

  footer,
}
