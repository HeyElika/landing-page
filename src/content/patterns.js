/**
 * The pattern catalogue.
 *
 * Every layout this template can build, with the props that produce it. The
 * gallery at /patterns renders each entry through the real section component,
 * so what you see there is what a product page gets — this file cannot drift
 * from the components the way a static screenshot would.
 *
 * The sample copy describes what belongs in each slot. Read a hero title here
 * as instructions, not as words to ship.
 *
 * To use a pattern: copy its `props` into a product file's `sections` array,
 * add `type`, and replace the copy.
 */

const media = (label, ratio = '4 / 3') => ({ src: null, label, ratio })

export const patterns = [
  {
    id: 'hero',
    name: 'Hero',
    job: 'Say what this is and offer one action. Every page has exactly one.',
    variants: [
      {
        label: 'Split — copy left, image right',
        note: 'The default. Add `fit: "viewport"` to hold it to one screen.',
        props: {
          type: 'hero',
          layout: 'split',
          title: ['A benefit-led headline', 'on two authored lines'],
          description: 'One sentence saying what the reader gets. Not a feature list.',
          ctas: [{ label: 'Primary action', href: '#', size: 'xl' }],
          note: 'A short qualifier, set small and italic above the headline.',
          appLink: { text: 'Secondary route?', label: 'Take this one instead', href: '#' },
          media: media('Product visual', '4 / 5'),
        },
      },
      {
        label: 'Centred — no image',
        note: 'For a page whose subject has no single strong visual.',
        props: {
          type: 'hero',
          layout: 'centered',
          background: 'subtle',
          title: 'A headline that centres well',
          description: 'Centred heroes want shorter copy than split ones.',
          ctas: [{ label: 'Primary action', href: '#' }],
          media: media('Wide visual', '16 / 9'),
        },
      },
    ],
  },

  {
    id: 'features',
    name: 'Benefits',
    job: 'Three or four reasons to act. Never a full feature inventory.',
    variants: [
      {
        label: 'Image cards — copy over the image',
        note: 'Give each item a `media`. Portrait cards, copy over a scrim. Best when you have real photography.',
        props: {
          type: 'features',
          label: 'Section name for screen readers when there is no visible heading',
          columns: 3,
          items: [
            { media: media('Visual one', '2 / 3'), title: 'Benefit as a claim', description: 'One sentence of evidence for it.' },
            { media: media('Visual two', '2 / 3'), title: 'Second benefit', description: 'Keep these the same length.' },
            { media: media('Visual three', '2 / 3'), title: 'Third benefit', description: 'Three reads better than four.' },
          ],
        },
      },
      {
        label: 'Icon cards',
        note: 'Give each item an `icon` instead of `media`. For pages with no photography yet.',
        props: {
          type: 'features',
          title: 'A heading above icon cards',
          background: 'subtle',
          columns: 4,
          items: [
            { icon: 'wallet', title: 'First benefit', description: 'A sentence of evidence.' },
            { icon: 'clock', title: 'Second benefit', description: 'A sentence of evidence.' },
            { icon: 'security', title: 'Third benefit', description: 'A sentence of evidence.' },
            { icon: 'chat-outline', title: 'Fourth benefit', description: 'Four is the maximum.' },
          ],
        },
      },
    ],
  },

  {
    id: 'steps',
    name: 'How it works',
    job: 'The sequence between deciding and finishing.',
    variants: [
      {
        label: 'Split — steps beside one visual',
        note: 'Add `reverse: true` to put the visual on the left. `fit: "viewport"` holds it to one screen.',
        props: {
          type: 'stepsSplit',
          title: 'A heading that names the process.',
          media: media('Process visual', '1 / 1'),
          steps: [
            { title: 'First step, as an instruction', description: 'What the reader does, and what they need to hand.' },
            { title: 'Second step', description: 'Keep each step to one action.' },
            { title: 'Third step', description: 'Four steps is the practical maximum.' },
          ],
        },
      },
      {
        label: 'Row — steps across, no visual',
        note: 'For a process that needs no illustration.',
        props: {
          type: 'steps',
          title: 'The same process without an image',
          background: 'subtle',
          items: [
            { title: 'First step', description: 'What the reader does.' },
            { title: 'Second step', description: 'What the reader does.' },
            { title: 'Third step', description: 'What the reader does.' },
          ],
        },
      },
    ],
  },

  {
    id: 'split',
    name: 'Text and image',
    job: 'One idea explained beside a visual. The workhorse layout.',
    variants: [
      {
        label: 'Intro plus supporting points — image right',
        note: 'This is the `security` section, but nothing about it is security-specific. Add `reverse: true` for image left.',
        props: {
          type: 'security',
          title: 'A heading and a visual, then points beneath.',
          description: 'A paragraph introducing the idea, then three supporting points below it.',
          media: media('Supporting visual', '1 / 1'),
          items: [
            { icon: 'document', title: 'Supporting point', description: 'A sentence of detail.' },
            { icon: 'lock', title: 'Second point', description: 'A sentence of detail.' },
            { icon: 'chat-outline', title: 'Third point', description: 'A sentence of detail.' },
          ],
        },
      },
      {
        label: 'Contained panel — tinted block, image right',
        note: 'Use `reverse: true` to flip, `tone` to change the fill. Lifts one idea out of the page flow.',
        props: {
          type: 'panel',
          title: 'One idea in a contained panel',
          paragraphs: ['A panel separates an idea from the page around it without a full-width colour band.'],
          bullets: ['A supporting point', 'Another supporting point'],
          cta: { label: 'Action', href: '#' },
          media: media('Panel visual', '4 / 3'),
        },
      },
      {
        label: 'Alternating rows',
        note: 'Rows flip automatically; set `reverse` on a row to override. For explaining several features in depth.',
        props: {
          type: 'spotlight',
          title: 'Several ideas, alternating sides',
          rows: [
            {
              title: 'First idea',
              description: 'The row starts with copy on the left.',
              bullets: ['A supporting point', 'Another one'],
              media: media('Visual one'),
            },
            {
              title: 'Second idea',
              description: 'The next row flips automatically.',
              media: media('Visual two'),
            },
          ],
        },
      },
    ],
  },

  {
    id: 'faq',
    name: 'FAQ',
    job: 'Genuine conversion blockers. Conditions belong on the page, not buried here.',
    variants: [
      {
        label: 'Flat list',
        note: 'One row per question. Answers accept a string or an array of paragraphs.',
        props: {
          type: 'faq',
          title: 'Frequently asked questions',
          items: [
            { question: 'A question in the reader’s words?', answer: 'A direct answer. First sentence carries it; detail follows.' },
            { question: 'A second question?', answer: ['An answer in two paragraphs.', 'The second adds detail the first implied.'] },
            { question: 'A third question?', answer: 'Six or so questions is the useful maximum.' },
          ],
        },
      },
      {
        label: 'Grouped',
        note: 'Pass `groups` instead of `items` when a long list needs organising. Labels sit quietly above their rows.',
        props: {
          type: 'faq',
          title: 'Grouped questions',
          groups: [
            { label: 'Getting started', items: [{ question: 'A question?', answer: 'An answer.' }, { question: 'Another?', answer: 'An answer.' }] },
            { label: 'Using it', items: [{ question: 'A question?', answer: 'An answer.' }] },
          ],
        },
      },
    ],
  },

  {
    id: 'conversion',
    name: 'Closing the page',
    job: 'The last thing on the page, before the footer.',
    variants: [
      {
        label: 'App download panel',
        note: 'Contained blue block with the store badges. `reverse: true` puts the visual on the right.',
        props: {
          type: 'appDownload',
          title: 'Get the app',
          description: 'One sentence telling the reader what to do next.',
          media: media('App icon', '1 / 1'),
          apps: [
            { name: 'Download on the App Store', href: '#', src: '/badge-app-store.svg' },
            { name: 'Get it on Google Play', href: '#', src: '/badge-google-play.png' },
          ],
        },
      },
      {
        label: 'CTA band',
        note: 'Full-width colour. Use `background: "brand" | "dark" | "subtle"`. Only when the page has no other closing action.',
        props: {
          type: 'ctaBand',
          background: 'dark',
          title: 'A closing line that repeats the offer',
          description: 'One sentence. The action must match the hero’s.',
          ctas: [{ label: 'Primary action', href: '#' }],
          note: 'Any qualifier the action needs.',
        },
      },
    ],
  },

  {
    id: 'supporting',
    name: 'Supporting sections',
    job: 'Reach for these only when the product genuinely needs them.',
    variants: [
      {
        label: 'Conditions — things to know before deciding',
        note: 'Belongs BEFORE the FAQ. Anything a reader must know to decide goes here, never only in an answer.',
        props: {
          type: 'conditions',
          title: 'Important things to know',
          items: [
            { icon: 'cash', title: 'A condition', detail: 'Stated plainly, in full, with no euphemism.' },
            { icon: 'clock', title: 'Another condition', detail: 'Timing, cost and eligibility all belong here.' },
          ],
        },
      },
      {
        label: 'Use cases — where it works',
        note: 'Short rows with an icon. Only list what Product has confirmed.',
        props: {
          type: 'useCases',
          title: 'Where you can use it',
          items: [
            { icon: 'store', title: 'A place', description: 'A sentence.' },
            { icon: 'phone', title: 'Another place', description: 'A sentence.' },
            { icon: 'cart', title: 'A third', description: 'A sentence.' },
          ],
        },
      },
      {
        label: 'Two choices side by side',
        note: 'For a page whose job is a decision between two products.',
        props: {
          type: 'choicePair',
          title: 'Choose whatever fits you',
          items: [
            { title: 'First option', description: 'Who it suits and why.', media: media('Option one'), href: '#' },
            { title: 'Second option', description: 'Who it suits and why.', tone: 'dark', media: media('Option two'), href: '#' },
          ],
        },
      },
      {
        label: 'Pricing / terms',
        note: 'Every figure here is a content dependency. Nothing ships without Risk and Legal.',
        props: {
          type: 'pricing',
          title: 'Terms',
          plans: [
            { name: 'Shortest term', price: '₱0,000', unit: '/ month', features: ['Confirm with Product', 'Confirm with Legal'], cta: { label: 'Action', href: '#' } },
            { name: 'Middle term', price: '₱0,000', unit: '/ month', featured: true, features: ['Confirm with Product', 'Confirm with Legal'], cta: { label: 'Action', href: '#' } },
            { name: 'Longest term', price: '₱0,000', unit: '/ month', features: ['Confirm with Product', 'Confirm with Legal'], cta: { label: 'Action', href: '#' } },
          ],
        },
      },
    ],
  },
]

export default patterns
