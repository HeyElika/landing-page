/**
 * Shared across every product page: identity, global nav and footer.
 * Product files can override any of these by setting the same key.
 */

export const brand = {
  name: 'Billease',
  href: '/',
  logo: '/billease-logo.png',              // official wordmark, from the brand assets folder
  logoOnDark: '/billease-logo-on-dark.png',
  tagline: 'Buy now, pay later for everyday Filipinos.',
}

export const nav = {
  links: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  secondaryCta: { label: 'Log in', href: 'https://app.billease.ph' },
  cta: { label: 'Get started', href: '#get-started' },
}

export const footer = {
  columns: [
    {
      title: 'Products',
      links: [
        { label: 'Pay later', href: '/pay-later' },
        { label: 'Cash loan', href: '/cash-loan' },
        { label: 'Partner stores', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Newsroom', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help centre', href: '#' },
        { label: 'Contact us', href: '#' },
        { label: 'Report a concern', href: '#' },
      ],
    },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: 'link' },
    { name: 'Instagram', href: '#', icon: 'photo' },
    { name: 'Support chat', href: '#', icon: 'chat-outline' },
  ],
  legal: [
    'Replace this block with the approved regulatory disclosure for the product on this page. Keep the wording exactly as legal signed it off.',
    'Billease is a registered lending company. Certificate and registration numbers go here.',
  ],
  bottomLinks: [
    { label: 'Privacy policy', href: '#' },
    { label: 'Terms of use', href: '#' },
    { label: 'Cookie settings', href: '#' },
  ],
  copyright: `© ${new Date().getFullYear()} Billease. All rights reserved.`,
}
