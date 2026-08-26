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
   * Modelled on the live billease.ph footer, trimmed to one flat row of links.
   * Replace the placeholder hrefs with the real destinations before launch.
   */
  links: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact us', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms and conditions', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
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

  copyright: `Copyright ${new Date().getFullYear()} Billease`,
}
