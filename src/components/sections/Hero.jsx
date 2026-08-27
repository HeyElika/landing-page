import Badge from '../ui/Badge'
import Cta from '../ui/Cta'
import Media from '../ui/Media'

/**
 * Hero. `layout: 'split'` places the product visual beside the copy,
 * `'centered'` stacks it underneath.
 *
 * `fit: 'viewport'` sizes the section to one screen on desktop, so the product
 * visual is never cut off at the fold. The image is bounded by height as well
 * as width, so it shrinks rather than crops.
 *
 * `title` accepts a string, or an array of strings to control where the
 * headline breaks. Each line renders as a block inside the single h1, so the
 * heading stays one element. Text balancing is dropped for an authored break,
 * since the browser would otherwise rebalance against the author's choice.
 *
 * Per DESIGN-RULES.md the headline is heading-xl-bold and there is one
 * primary call to action. Any second action is visually subordinate.
 */
export default function Hero({
  layout = 'split',
  badge,
  title,
  description,
  ctas = [],
  note,
  appLink,
  media,
  mediaBackdrop = 'none',   // 'none' | 'subtle' | 'sunken' | 'brand' | 'info'
  fit = 'auto',             // 'auto' | 'viewport' — fit the hero into one screen
  background = 'default',
}) {
  const onDark = background === 'dark' || background === 'brand'
  const bandTone = { default: '', subtle: 'l-band--subtle', dark: 'l-band--dark', brand: 'l-band--brand' }[background] || ''
  const centered = layout === 'centered'

  // Reference fintech pages present the card or app on a tinted surface rather
  // than bare on the page. Tokens only; no invented colour.
  const BACKDROPS = {
    none: null,
    subtle: 'var(--bg-subtle)',
    sunken: 'var(--bg-sunken)',
    brand: 'var(--bg-error-subtle)',
    info: 'var(--bg-info-subtle)',
  }
  const backdrop = BACKDROPS[mediaBackdrop] ?? null

  const renderMedia = (ratio, label) => {
    const el = <Media {...(media || {})} ratio={media?.ratio || ratio} label={media?.label || label} priority />
    if (!backdrop) return el
    return (
      <div
        style={{
          background: backdrop,
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-600)',
        }}
      >
        {el}
      </div>
    )
  }

  const copy = (
    <div className={['l-stack', 'l-stack--600', centered ? 'c-section-head--center' : ''].filter(Boolean).join(' ')}>
      <div className="l-stack l-stack--400">
        {badge && <span><Badge {...badge} /></span>}
        {/* Sits above the headline as a standfirst: the two facts that decide
            whether the rest of the page is worth reading. Italic is not in the
            type scale, so it is set here rather than as a new style class. */}
        {note && (
          <p
            className={['body-sm-regular', onDark ? 't-on-dark-subtle' : 't-subtle'].filter(Boolean).join(' ')}
            style={{ fontStyle: 'italic' }}
          >
            {note}
          </p>
        )}
        {title && (
          <h1
            className={[
              'display-lg',
              // An authored line break replaces balancing: the two would fight.
              Array.isArray(title) ? '' : 't-balance',
              onDark ? 't-on-dark' : '',
            ].filter(Boolean).join(' ')}
          >
            {Array.isArray(title)
              ? title.map((line) => <span key={line} style={{ display: 'block' }}>{line}</span>)
              : title}
          </h1>
        )}
        {description && (
          <p className={['body-lg-regular', 'hero-lead', onDark ? 't-on-dark-subtle' : ''].filter(Boolean).join(' ')}>
            {description}
          </p>
        )}
      </div>

      {ctas.length > 0 && (
        <div className="l-row" style={{ justifyContent: centered ? 'center' : 'flex-start' }}>
          {ctas.map((c, i) => (
            <Cta key={c.label} {...c} type={c.type || (i === 0 ? 'primary' : 'ghost')} onDark={onDark} />
          ))}
        </div>
      )}

      {/* A secondary route for a reader the main action does not suit.
          Content decides whether it links: give it an `href` and the label
          becomes a link, leave it out and the label is emphasised text.
          Plain is right when the destination is already on the page — a
          second underlined thing under the button reads as a second action. */}
      {appLink && (
        <p className={['body-md-regular', onDark ? 't-on-dark-subtle' : 't-subtle'].join(' ')}>
          {appLink.text}{' '}
          {appLink.href
            ? <a className="link-md" style={{ color: onDark ? 'var(--text-on-dark)' : 'var(--text-base)' }} href={appLink.href}>{appLink.label}</a>
            : <span className={['body-md-semibold', onDark ? 't-on-dark' : 't-base'].join(' ')}>{appLink.label}</span>}
        </p>
      )}

    </div>
  )

  return (
    <section
      id="top"
      className={['l-band', fit === 'viewport' ? 'l-band--viewport' : 'l-band--lg', bandTone].filter(Boolean).join(' ')}
    >
      <div className={['l-container', centered ? 'l-stack l-stack--800' : ''].filter(Boolean).join(' ')}>
        {centered ? (
          <>
            {copy}
            {renderMedia('16 / 9', 'Product visual')}
          </>
        ) : (
          <div className="hero-split" style={{ display: 'grid', gap: 'var(--space-900)', alignItems: 'center' }}>
            {copy}
            {renderMedia('4 / 5', 'Product visual')}
          </div>
        )}
      </div>
    </section>
  )
}
