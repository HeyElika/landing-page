/**
 * Image slot. A product file with no image yet renders an empty box at the
 * expected ratio, so the layout holds where the image will go.
 *
 * The box is deliberately blank. It used to print the label and the ratio,
 * which was useful while building the page and looked like unfinished copy the
 * moment anyone else saw it. Content files still carry a `label` for each
 * slot: it names what belongs there, and is simply not rendered.
 *
 * Pass `priority` for an above-the-fold image. The hero visual is usually the
 * largest contentful paint, and lazy-loading it delays the metric it defines.
 */
export default function Media({ src, alt = '', ratio = '4 / 3', className = '', priority = false }) {
  if (!src) {
    return (
      <div
        className={['c-placeholder', className].filter(Boolean).join(' ')}
        style={{ '--ratio': ratio }}
        aria-hidden="true"
      />
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
