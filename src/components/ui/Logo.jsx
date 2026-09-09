/**
 * Wordmark.
 *
 * The official Billease logo, exported from Figma file qESeTFW1GEEosrYnm4Hu3b:
 *   15235:1707  wordmark with the mascot  -> billease-logo.svg
 *   193:6448    on dark                   -> billease-logo-on-dark.svg
 *
 * Vector, 119x24 natural, no padding inside the box. The header gives it the
 * same 130x28 box billease.ph uses and fits the artwork inside it, so the box
 * matches and the artwork is never stretched. Do not redraw, recolour or
 * re-letter it; re-export instead.
 *
 * The text lockup below is only a fallback for a page that sets no logo.
 */
export default function Logo({ src, name = 'Billease', onDark = false }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        width={119}
        height={24}
        style={{ width: 'var(--logo-w)', height: 'var(--logo-h)', objectFit: 'contain', objectPosition: 'left center', display: 'block' }}
      />
    )
  }
  return (
    <span className="heading-lg-bold" style={{ color: onDark ? 'var(--text-on-dark)' : 'var(--text-base)' }}>
      {name}
      <span style={{ color: 'var(--text-brand-primary)' }}>.</span>
    </span>
  )
}
