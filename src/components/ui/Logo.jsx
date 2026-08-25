/**
 * Wordmark.
 *
 * CONTENT DEPENDENCY: the official Billease logo has not been added to this
 * repo yet. Drop the export into `public/` and set `brand.logo` in
 * src/content/brand.js to use it. Until then this text lockup stands in, so a
 * page is never blocked on the asset.
 */
export default function Logo({ src, name = 'Billease', onDark = false }) {
  if (src) return <img src={src} alt={name} style={{ height: 'var(--space-700)' }} />
  return (
    <span className="heading-lg-bold" style={{ color: onDark ? 'var(--text-on-dark)' : 'var(--text-base)' }}>
      {name}
      <span style={{ color: 'var(--text-brand-primary)' }}>.</span>
    </span>
  )
}
