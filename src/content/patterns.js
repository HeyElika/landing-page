/**
 * The pattern catalogue: one entry per section, each with its versions.
 *
 * Grouped by section rather than by theme. Grouping thematically meant a
 * version number counted across unrelated sections, so 'pricing' answered to
 * v4 and 'steps' to v2 for no reason a reader could see. A version now counts
 * within its own section: hero v1 and hero v2 are the two heroes.
 *
 * The gallery at /patterns renders each version through the real section
 * component, so what is shown is what a page gets. Copy a variant's `props`
 * into a product file's `sections` array and the layout is built.
 *
 * The sample copy describes what belongs in each slot. Read a hero title here
 * as instructions, not as words to ship.
 */

export const patterns = [
  {
    id: 'hero',
    name: 'Hero',
    job: 'What this is, and the one action to take.',
    variants: [
      {
        version: 'v1',
        label: 'Split — copy left, image right',
        note: 'The default. Add `fit: "viewport"` to hold it to one screen.',
        props: {
          type: 'hero',
          layout: 'split',
          title: [
            'A benefit-led headline',
            'on two authored lines'
          ],
          description: 'One sentence saying what the reader gets. Not a feature list.',
          ctas: [
            {
              label: 'Primary action',
              href: '#',
              size: 'xl'
            }
          ],
          note: 'A short qualifier, set small and italic above the headline.',
          appLink: {
            text: 'A secondary route?',
            label: 'Linked when it has an href',
            href: '#'
          },
          media: {
            src: null,
            label: 'Product visual',
            ratio: '4 / 5'
          }
        }
      },
      {
        version: 'v2',
        label: 'Centred — no image',
        note: 'For a page whose subject has no single strong visual.',
        props: {
          type: 'hero',
          layout: 'centered',
          background: 'subtle',
          title: 'A headline that centres well',
          description: 'Centred heroes want shorter copy than split ones.',
          ctas: [
            {
              label: 'Primary action',
              href: '#'
            }
          ],
          appLink: {
            text: 'Without an href,',
            label: 'the label is plain emphasis'
          },
          media: {
            src: null,
            label: 'Wide visual',
            ratio: '16 / 9'
          }
        }
      }
    ]
  },
  {
    id: 'benefits',
    name: 'Benefits',
    job: 'Three or four reasons to act, never a feature list.',
    variants: [
      {
        version: 'v1',
        label: 'Image cards — copy over the image',
        note: 'Give each item a `media`. Portrait cards, copy over a scrim. Best when you have real photography. Four cards want `width: \'wide\'` — inside the content column they are 276px each, narrower than their own copy.',
        props: {
          type: 'benefits',
          label: 'Section name for screen readers when there is no visible heading',
          columns: 3,
          items: [
            {
              media: {
                src: null,
                label: 'Visual one',
                ratio: '2 / 3'
              },
              title: 'Benefit as a claim',
              description: 'One sentence of evidence for it.'
            },
            {
              media: {
                src: null,
                label: 'Visual two',
                ratio: '2 / 3'
              },
              title: 'Second benefit',
              description: 'Keep these the same length.'
            },
            {
              media: {
                src: null,
                label: 'Visual three',
                ratio: '2 / 3'
              },
              title: 'Third benefit',
              description: 'Three reads better than four.'
            }
          ]
        }
      },
      {
        version: 'v2',
        label: 'Icon cards',
        note: 'Give each item an `icon` instead of `media`. For pages with no photography yet.',
        props: {
          type: 'benefits',
          title: 'A heading above icon cards',
          background: 'subtle',
          columns: 4,
          items: [
            {
              icon: 'wallet',
              title: 'First benefit',
              description: 'A sentence of evidence.'
            },
            {
              icon: 'clock',
              title: 'Second benefit',
              description: 'A sentence of evidence.'
            },
            {
              icon: 'security',
              title: 'Third benefit',
              description: 'A sentence of evidence.'
            },
            {
              icon: 'chat-outline',
              title: 'Fourth benefit',
              description: 'Four is the maximum.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'statement',
    name: 'Statement',
    job: 'One message on an empty screen, with the page’s action under it.',
    variants: [
      {
        version: 'v1',
        label: 'Converging lines',
        note: 'Full screen, white. Each line arrives from its own angle and distance, resolving from blurred grey to sharp black as the section centres, and drifting back out as it leaves. Two or three lines; it is a sentence, not a paragraph.',
        props: {
          type: 'statement',
          lines: [
            'A short statement',
            'across two',
            'or three lines.'
          ],
          ctas: [
            {
              label: 'The page’s action',
              href: '#',
              size: 'xl'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'stepsSplit',
    name: 'Steps beside a visual',
    job: 'The steps to get started, next to one image.',
    variants: [
      {
        version: 'v1',
        label: 'Visual left, steps right',
        note: 'The arrangement the Access Card page uses. Drop `reverse` to put the visual on the right. `fit: "viewport"` holds the section to one screen.',
        props: {
          type: 'stepsSplit',
          reverse: true,
          title: 'A heading that names the process.',
          media: {
            src: null,
            label: 'Process visual',
            ratio: '1 / 1'
          },
          steps: [
            {
              title: 'First step, as an instruction',
              description: 'What the reader does, and what they need to hand.'
            },
            {
              title: 'Second step',
              description: 'Keep each step to one action.'
            },
            {
              title: 'Third step',
              description: 'Four steps is the practical maximum.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'steps',
    name: 'Steps in a row',
    job: 'The same steps across the page, with no image.',
    variants: [
      {
        version: 'v1',
        label: 'Row — steps across, no visual',
        note: 'For a process that needs no illustration.',
        props: {
          type: 'steps',
          title: 'The same process without an image',
          background: 'subtle',
          items: [
            {
              title: 'First step',
              description: 'What the reader does.'
            },
            {
              title: 'Second step',
              description: 'What the reader does.'
            },
            {
              title: 'Third step',
              description: 'What the reader does.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'useCases',
    name: 'Use cases',
    job: 'Where the product can be used.',
    variants: [
      {
        version: 'v1',
        label: 'Use cases — where it works',
        note: 'Short rows with an icon. Only list what Product has confirmed.',
        props: {
          type: 'useCases',
          title: 'Where you can use it',
          items: [
            {
              icon: 'store',
              title: 'A place',
              description: 'A sentence.'
            },
            {
              icon: 'phone',
              title: 'Another place',
              description: 'A sentence.'
            },
            {
              icon: 'cart',
              title: 'A third',
              description: 'A sentence.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'featureSplit',
    name: 'Media and points',
    job: 'An intro with a visual, then supporting points beneath it.',
    variants: [
      {
        version: 'v1',
        label: 'Intro plus supporting points — image right',
        note: '`featureSplit`: an intro with a visual, then supporting points. Add `reverse: true` for image left.',
        props: {
          type: 'featureSplit',
          title: 'A heading and a visual, then points beneath.',
          description: 'A paragraph introducing the idea, then three supporting points below it.',
          media: {
            src: null,
            label: 'Supporting visual',
            ratio: '1 / 1'
          },
          items: [
            {
              icon: 'document',
              title: 'Supporting point',
              description: 'A sentence of detail.'
            },
            {
              icon: 'lock',
              title: 'Second point',
              description: 'A sentence of detail.'
            },
            {
              icon: 'chat-outline',
              title: 'Third point',
              description: 'A sentence of detail.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'panel',
    name: 'Panel',
    job: 'One idea lifted out of the flow into a contained block.',
    variants: [
      {
        version: 'v1',
        label: 'Contained panel — tinted block, image right',
        note: 'Use `reverse: true` to flip, `tone` to change the fill. Lifts one idea out of the page flow.',
        props: {
          type: 'panel',
          title: 'One idea in a contained panel',
          paragraphs: [
            'A panel separates an idea from the page around it without a full-width colour band.'
          ],
          bullets: [
            'A supporting point',
            'Another supporting point'
          ],
          cta: {
            label: 'Action',
            href: '#'
          },
          media: {
            src: null,
            label: 'Panel visual',
            ratio: '4 / 3'
          }
        }
      }
    ]
  },
  {
    id: 'featureRows',
    name: 'Feature rows',
    job: 'Several ideas in alternating rows.',
    variants: [
      {
        version: 'v1',
        label: 'Alternating rows',
        note: 'Rows flip automatically; set `reverse` on a row to override. For explaining several features in depth.',
        props: {
          type: 'featureRows',
          title: 'Several ideas, alternating sides',
          rows: [
            {
              title: 'First idea',
              description: 'The row starts with copy on the left.',
              bullets: [
                'A supporting point',
                'Another one'
              ],
              media: {
                src: null,
                label: 'Visual one',
                ratio: '4 / 3'
              }
            },
            {
              title: 'Second idea',
              description: 'The next row flips automatically.',
              media: {
                src: null,
                label: 'Visual two',
                ratio: '4 / 3'
              }
            }
          ]
        }
      }
    ]
  },
  {
    id: 'choicePair',
    name: 'Choice pair',
    job: 'Two options side by side.',
    variants: [
      {
        version: 'v1',
        label: 'Two choices side by side',
        note: 'For a page whose job is a decision between two products.',
        props: {
          type: 'choicePair',
          title: 'Choose whatever fits you',
          items: [
            {
              title: 'First option',
              description: 'Who it suits and why.',
              media: {
                src: null,
                label: 'Option one',
                ratio: '4 / 3'
              },
              href: '#'
            },
            {
              title: 'Second option',
              description: 'Who it suits and why.',
              tone: 'dark',
              media: {
                src: null,
                label: 'Option two',
                ratio: '4 / 3'
              },
              href: '#'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'pricing',
    name: 'Pricing',
    job: 'Terms and what they cost.',
    variants: [
      {
        version: 'v1',
        label: 'Pricing / terms',
        note: 'Every figure here is a content dependency. Nothing ships without Risk and Legal.',
        props: {
          type: 'pricing',
          title: 'Terms',
          plans: [
            {
              name: 'Shortest term',
              price: '₱0,000',
              unit: '/ month',
              features: [
                'Confirm with Product',
                'Confirm with Legal'
              ],
              cta: {
                label: 'Action',
                href: '#'
              }
            },
            {
              name: 'Middle term',
              price: '₱0,000',
              unit: '/ month',
              featured: true,
              features: [
                'Confirm with Product',
                'Confirm with Legal'
              ],
              cta: {
                label: 'Action',
                href: '#'
              }
            },
            {
              name: 'Longest term',
              price: '₱0,000',
              unit: '/ month',
              features: [
                'Confirm with Product',
                'Confirm with Legal'
              ],
              cta: {
                label: 'Action',
                href: '#'
              }
            }
          ]
        }
      }
    ]
  },
  {
    id: 'conditions',
    name: 'Conditions',
    job: 'What a reader must know before deciding.',
    variants: [
      {
        version: 'v1',
        label: 'Conditions — things to know before deciding',
        note: 'Belongs BEFORE the FAQ. Anything a reader must know to decide goes here, never only in an answer.',
        props: {
          type: 'conditions',
          title: 'Important things to know',
          items: [
            {
              icon: 'cash',
              title: 'A condition',
              detail: 'Stated plainly, in full, with no euphemism.'
            },
            {
              icon: 'clock',
              title: 'Another condition',
              detail: 'Timing, cost and eligibility all belong here.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'faq',
    name: 'FAQ',
    job: 'Genuine conversion blockers.',
    variants: [
      {
        version: 'v1',
        label: 'Flat list',
        note: 'One row per question. Answers accept a string or an array of paragraphs.',
        props: {
          type: 'faq',
          title: 'Frequently asked questions',
          items: [
            {
              question: 'A question in the reader’s words?',
              answer: 'A direct answer. First sentence carries it; detail follows.'
            },
            {
              question: 'A second question?',
              answer: [
                'An answer in two paragraphs.',
                'The second adds detail the first implied.'
              ]
            },
            {
              question: 'A third question?',
              answer: 'Six or so questions is the useful maximum.'
            }
          ]
        }
      },
      {
        version: 'v2',
        label: 'Grouped',
        note: 'Pass `groups` instead of `items` when a long list needs organising. Labels sit quietly above their rows.',
        props: {
          type: 'faq',
          title: 'Grouped questions',
          groups: [
            {
              label: 'Getting started',
              items: [
                {
                  question: 'A question?',
                  answer: 'An answer.'
                },
                {
                  question: 'Another?',
                  answer: 'An answer.'
                }
              ]
            },
            {
              label: 'Using it',
              items: [
                {
                  question: 'A question?',
                  answer: 'An answer.'
                }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'appDownload',
    name: 'App download',
    job: 'Get the app, with the store badges.',
    variants: [
      {
        version: 'v1',
        label: 'App download panel',
        note: 'Contained block with the store badges. `reverse: true` puts the visual on the right; `tone: "dark" | "brand"` changes the fill from blue.',
        props: {
          type: 'appDownload',
          title: 'Get the app',
          description: 'One sentence telling the reader what to do next.',
          media: {
            src: null,
            label: 'App icon',
            ratio: '1 / 1'
          },
          apps: [
            {
              name: 'Download on the App Store',
              href: '#',
              src: '/badge-app-store.svg'
            },
            {
              name: 'Get it on Google Play',
              href: '#',
              src: '/badge-google-play.png'
            }
          ]
        }
      },
      {
        version: 'v2',
        label: 'App download panel — dark, visual on the right',
        note: 'The same pattern with `tone: "dark"` and `reverse: true`.',
        props: {
          type: 'appDownload',
          tone: 'dark',
          reverse: true,
          title: 'The same panel, flipped and dark',
          description: 'Tone and side are content decisions, not new components.',
          media: {
            src: null,
            label: 'App icon',
            ratio: '1 / 1'
          },
          apps: [
            {
              name: 'Download on the App Store',
              href: '#',
              src: '/badge-app-store.svg'
            },
            {
              name: 'Get it on Google Play',
              href: '#',
              src: '/badge-google-play.png'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'finalCta',
    name: 'Final CTA',
    job: 'Repeat the single action.',
    variants: [
      {
        version: 'v1',
        label: 'CTA band',
        note: 'Full-width colour. Use `background: "brand" | "dark" | "subtle"`. Only when the page has no other closing action.',
        props: {
          type: 'finalCta',
          background: 'dark',
          title: 'A closing line that repeats the offer',
          description: 'One sentence. The action must match the hero’s.',
          ctas: [
            {
              label: 'Primary action',
              href: '#'
            }
          ],
          note: 'Any qualifier the action needs.'
        }
      }
    ]
  }
]

export default patterns


/**
 * Page chrome: the header and the footer.
 *
 * Not sections. A page has exactly one of each, always in the same place, so
 * they are never reordered and never repeated. They are catalogued because a
 * page still has to pick a variant of each, and because the choice is a real
 * one: a header with no action, a footer with no regulatory block.
 *
 * These render through NavBar and Footer, the same components LandingPage
 * mounts, so the catalogue cannot drift from the page.
 */
export const chrome = [
  {
    id: 'navbar',
    name: 'Header',
    job: 'Where the reader is, where else they can go, and the one action.',
    variants: [
      {
        version: 'v1',
        label: 'Links and an action',
        note: 'The default. Links sit next to the logo, the action at the far end. Under 900px it collapses to the burger.',
        props: {
          type: 'navbar',
          links: [
            { label: 'Section one', href: '#' },
            { label: 'Section two', href: '#' },
            { label: 'Section three', href: '#' },
            { label: 'FAQ', href: '#' },
          ],
          cta: { label: 'Primary action', href: '#' },
          mobileMenu: true,
        },
      },
      {
        version: 'v2',
        label: 'Links only',
        note: 'For a page whose action belongs to the content rather than the chrome, so the header never competes with the hero.',
        props: {
          type: 'navbar',
          links: [
            { label: 'Section one', href: '#' },
            { label: 'Section two', href: '#' },
            { label: 'Section three', href: '#' },
          ],
          mobileMenu: true,
        },
      },
      {
        version: 'v3',
        label: 'Action only',
        note: 'A one-screen page has nowhere to navigate to. Leave the links out rather than inventing anchors.',
        props: {
          type: 'navbar',
          cta: { label: 'Primary action', href: '#' },
          mobileMenu: false,
        },
      },
      {
        version: 'v4',
        label: 'Logo only',
        note: 'A page that must not be left, such as a step inside a flow. Nothing to click but the logo.',
        props: {
          type: 'navbar',
          mobileMenu: false,
        },
      },
    ],
  },
  {
    id: 'footer',
    name: 'Footer',
    job: 'The small print, and nothing that belongs higher up the page.',
    variants: [
      {
        version: 'v1',
        label: 'Regulatory statement, copyright, legal links',
        note: 'The default for anything regulated. `legal` takes the approved wording verbatim; it is never paraphrased or shortened to fit.',
        props: {
          type: 'footer',
          legal: [
            'The approved regulatory statement, exactly as Legal supplies it. Sample text only.',
            'A second paragraph where the statement runs to one.',
          ],
          copyright: 'Copyright YEAR Company',
          bottomLinks: [
            { label: 'Privacy policy', href: '#' },
            { label: 'Terms and conditions', href: '#' },
            { label: 'Cookie policy', href: '#' },
          ],
        },
      },
      {
        version: 'v2',
        label: 'Copyright and links',
        note: 'For a page carrying no regulated claim. Do not drop the regulatory block to save space on a page that needs it.',
        props: {
          type: 'footer',
          copyright: 'Copyright YEAR Company',
          bottomLinks: [
            { label: 'Privacy policy', href: '#' },
            { label: 'Terms and conditions', href: '#' },
          ],
        },
      },
      {
        version: 'v3',
        label: 'Statement and copyright',
        note: 'Where the legal links live in the app rather than on the page.',
        props: {
          type: 'footer',
          legal: ['The approved regulatory statement, exactly as Legal supplies it. Sample text only.'],
          copyright: 'Copyright YEAR Company',
        },
      },
    ],
  },
]
