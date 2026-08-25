/**
 * Image slot. When a product file has no image yet it renders a labelled
 * placeholder with the expected ratio, so the layout never collapses and it
 * is obvious what asset is still missing.
 */
export default function Media({ src, alt = '', ratio = '4 / 3', label = 'Image', className = '' }) {
  if (!src) {
    return (
      <div className={['c-placeholder', className].filter(Boolean).join(' ')} style={{ '--ratio': ratio }}>
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
