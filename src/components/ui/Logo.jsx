/**
 * Wordmark.
 *
 * The official Billease logo, exported from the component set in Figma file
 * qESeTFW1GEEosrYnm4Hu3b (node 193:6581):
 *   193:6582  mode=on-light  -> billease-logo.svg
 *   193:6448  mode=on-dark   -> billease-logo-on-dark.svg
 *
 * Both are vector, 92x20, and identical apart from the "bill" fill. Do not
 * redraw, recolour or re-letter them. To update, re-export from that node.
 *
 * The text lockup below is only a fallback for a page that sets no logo.
 */
export default function Logo({ src, name = 'Billease', onDark = false }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        width={92}
        height={20}
        style={{ height: 'var(--space-600)', width: 'auto' }}
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
