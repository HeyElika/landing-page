/**
 * Image slot. A product file with no image yet renders a labelled placeholder
 * at the expected ratio, so the layout holds and the missing asset is obvious.
 */
export default function Media({ src, alt = '', ratio = '4 / 3', label = 'Image', className = '' }) {
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
      <img src={src} alt={alt} loading="lazy" />
    </div>
  )
}
