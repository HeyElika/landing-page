/**
 * Wordmark.
 *
 * The official Billease logo, exported from Figma file qESeTFW1GEEosrYnm4Hu3b:
 *   15235:1707  wordmark with the mascot  -> billease-logo.svg
 *   193:6448    on dark                   -> billease-logo-on-dark.svg
 *
 * Vector, 119x24 natural, no padding inside the box. Rendered at --logo-h so
 * the artwork measures the same as billease.ph's, which sits padded inside a
 * 130x28 box. Do not redraw, recolour or re-letter it; re-export instead.
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
        style={{ height: 'var(--logo-h)', width: 'auto', display: 'block' }}
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
