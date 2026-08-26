/**
 * Shared across every product page: identity, global nav and footer.
 * Product files can override any of these by setting the same key.
 */

export const brand = {
  name: 'Billease',
  href: '/',
  logo: '/billease-logo.svg',              // official wordmark, exported from Figma
  logoOnDark: '/billease-logo-on-dark.svg',
  tagline: 'Buy now, pay later for everyday Filipinos.',
}

export const nav = {
  links: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: { label: 'Get started', href: '#get-started' },
}

export const footer = {
  /**
   * Structured like the footers of comparable regulated lenders: link columns,
   * app stores, contact, the regulatory statement, then copyright.
   *
   * Replace the placeholder hrefs with real destinations before launch.
   */
  columns: [
    {
      title: 'Products',
      links: [
        { label: 'Access Card', href: '/' },
        { label: 'Pay later', href: '/pay-later' },
        { label: 'Cash loan', href: '/cash-loan' },
        { label: 'Partner stores', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About us', href: '#' },
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
        { label: 'FAQ', href: '#faq' },
      ],
    },
  ],

  /**
   * CONTENT DEPENDENCY: swap these for the official App Store and Google Play
   * badge artwork. Both stores publish brand guidelines that require their own
   * badges, so a text button is a placeholder, not a shipping asset. Set `src`
   * on each entry and the image replaces the button.
   */
  appsTitle: 'Get the Billease app',
  apps: [
    { name: 'App Store', href: '#', src: null },
    { name: 'Google Play', href: '#', src: null },
  ],

  /** CONTENT DEPENDENCY: confirm the public support number and address. */
  contact: [
    { label: 'support@billease.ph', href: 'mailto:support@billease.ph' },
  ],

  social: [
    { name: 'Facebook', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'TikTok', href: '#' },
  ],

  /**
   * Regulatory statement, taken verbatim from the live billease.ph footer.
   * CONTENT DEPENDENCY: confirm with Legal that this is the current approved
   * wording and that the registration numbers are up to date. Never paraphrase
   * or shorten it.
   */
  legal: [
    'First Digital Finance Corporation doing business under the names and styles of FDFC, Balikbayad, and Billease is regulated by Securities and Exchange Commission as a financing company (CoA No.: 1101) and by the Bangko Sentral ng Pilipinas as Operator of Payment System (OPSCOR-2021-0007).',
  ],

  /**
   * Regulator marks shown on the live site. CONTENT DEPENDENCY: the image
   * files are not in this repo yet. Add them to public/ and set `src`, or
   * remove the entries. Until then each renders as a small text label.
   */
  badges: [
    { name: 'NPC', src: null },
    { name: 'SEC', src: null },
    { name: 'BSP', src: null },
  ],

  bottomLinks: [
    { label: 'Privacy policy', href: '#' },
    { label: 'Terms and conditions', href: '#' },
    { label: 'Cookie settings', href: '#' },
  ],

  copyright: `Copyright ${new Date().getFullYear()} Billease`,
}
