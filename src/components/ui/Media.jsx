/**
 * Image slot. A product file with no image yet renders an empty box at the
 * expected ratio, so the layout holds where the image will go.
 *
 * The box is deliberately blank. It used to print the label and the ratio,
 * which was useful while building the page and looked like unfinished copy the
 * moment anyone else saw it. Content files still carry a `label` for each
 * slot: it names what belongs there, and is simply not rendered.
 *
 * A slot's aspect ratio is the same at every breakpoint, so one file serves
 * every screen: the browser scales it, and nothing is ever re-cropped. The
 * only cost is bytes — a phone downloads a file sized for a tablet. Supply
 * `srcSmall` (a half-size export of the same crop) and the browser picks the
 * smaller file on small screens; leave it out and behaviour is unchanged.
 *
 * `sizes` tells the browser how wide the slot will be before layout happens.
 * The default covers the common case: near full width once the page stacks,
 * around half the content column above that.
 *
 * Pass `priority` for an above-the-fold image. The hero visual is usually the
 * largest contentful paint, and lazy-loading it delays the metric it defines.
 */
export default function Media({
  src,
  srcSmall,
  sizes = '(max-width: 900px) 92vw, 45vw',
  alt = '',
  ratio = '4 / 3',
  className = '',
  priority = false,
}) {
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
        srcSet={srcSmall ? `${srcSmall} 720w, ${src} 1440w` : undefined}
        sizes={srcSmall ? sizes : undefined}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
      />
    </div>
  )
}
