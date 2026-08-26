/**
 * Image slot. A product file with no image yet renders a labelled placeholder
 * at the expected ratio, so the layout holds and the missing asset is obvious.
 *
 * Pass `priority` for an above-the-fold image. The hero visual is usually the
 * largest contentful paint, and lazy-loading it delays the metric it defines.
 */
export default function Media({ src, alt = '', ratio = '4 / 3', label = 'Image', className = '', priority = false }) {
  if (!src) {
    return (
      <div
        className={['c-placeholder', 'body-sm-regular', className].filter(Boolean).join(' ')}
        style={{ '--ratio': ratio }}
      >
        <span>{label}</span>
        <span>{ratio.replace(/\s/g, '')}</span>
      </div>
    )
  }
  return (
    <div className={['c-media', className].filter(Boolean).join(' ')} style={{ aspectRatio: ratio }}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
      />
    </div>
  )
}
