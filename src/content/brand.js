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
   * Deliberately small: contact and the regulatory statement, then copyright
   * and the legal links. Navigation, app links and social live higher up the
   * page, and repeating them here only made the footer a second page.
   */


  /**
   * Regulatory statement, taken verbatim from the live billease.ph footer.
   * CONTENT DEPENDENCY: confirm with Legal that this is the current approved
   * wording and that the registration numbers are up to date. Never paraphrase
   * or shorten it.
   */
  legal: [
    'First Digital Finance Corporation doing business under the names and styles of FDFC, Balikbayad, and Billease is regulated by Securities and Exchange Commission as a financing company (CoA No.: 1101) and by the Bangko Sentral ng Pilipinas as Operator of Payment System (OPSCOR-2021-0007).',
  ],

  bottomLinks: [
    { label: 'Privacy policy', href: '#' },
    { label: 'Terms and conditions', href: '#' },
    { label: 'Cookie settings', href: '#' },
  ],

  copyright: `Copyright ${new Date().getFullYear()} Billease`,
}
