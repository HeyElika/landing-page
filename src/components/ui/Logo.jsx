/**
 * Wordmark. Replace `src/assets/logo.svg` with the official export and set
 * `brand.logo` in the product file to use it; this text lockup is the
 * fallback so a new page is never blocked on an asset.
 */
export default function Logo({ src, name = 'billease', onDark = false, height = 28 }) {
  if (src) return <img src={src} alt={name} style={{ height }} />
  return (
    <span
      style={{
        fontFamily: 'var(--ds-font-family)',
        fontSize: 'var(--text-2xl)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: onDark ? 'var(--text-on-dark)' : 'var(--text-base)',
        lineHeight: 1,
      }}
    >
      {name}
      <span style={{ color: 'var(--text-primary)' }}>.</span>
    </span>
  )
}
