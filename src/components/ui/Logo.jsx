/**
 * Wordmark.
 *
 * The official Billease logo, taken from the shared brand assets folder:
 * `billease-on-light.png` and `billease-on-dark.png`, 276x60 (a 24px logo at
 * ~2.3x, so it stays sharp on retina). Do not redraw or recolour it.
 *
 * The text lockup below is only a fallback for a page that sets no logo.
 */
export default function Logo({ src, name = 'Billease', onDark = false }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        width={276}
        height={60}
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
