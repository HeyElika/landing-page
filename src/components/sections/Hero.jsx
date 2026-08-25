import Badge from '../ui/Badge'
import Cta from '../ui/Cta'
import Media from '../ui/Media'
import Icon from '../../assets/icons/Icon'

/**
 * Hero. `layout: 'split'` places the product visual beside the copy,
 * `'centered'` stacks it underneath.
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
  highlights = [],
  media,
  background = 'default',
}) {
  const onDark = background === 'dark' || background === 'brand'
  const bandTone = { default: '', subtle: 'l-band--subtle', dark: 'l-band--dark', brand: 'l-band--brand' }[background] || ''
  const centered = layout === 'centered'

  const copy = (
    <div className={['l-stack', 'l-stack--600', centered ? 'c-section-head--center' : ''].filter(Boolean).join(' ')}>
      <div className="l-stack l-stack--400">
        {badge && <span><Badge {...badge} tone={onDark ? 'onDark' : badge.tone} /></span>}
        {title && <h1 className={['heading-xl-bold', 't-balance', onDark ? 't-on-dark' : ''].filter(Boolean).join(' ')}>{title}</h1>}
        {description && (
          <p className={['body-md-regular', 'l-measure', onDark ? 't-on-dark-subtle' : 't-subtle'].join(' ')}>
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

      {note && <p className={['body-xs-regular', onDark ? 't-on-dark-subtle' : 't-subtle'].join(' ')}>{note}</p>}

      {highlights.length > 0 && (
        <ul className="l-row" style={{ gap: 'var(--space-600)', justifyContent: centered ? 'center' : 'flex-start' }}>
          {highlights.map((h) => (
            <li key={h.label} className="l-row body-sm-semibold" style={{ gap: 'var(--space-200)' }}>
              <Icon name={h.icon || 'tick'} size="sm" color={onDark ? 'var(--icon-on-dark)' : 'var(--icon-success-bold)'} />
              <span className={onDark ? 't-on-dark-subtle' : ''}>{h.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  return (
    <section id="top" className={['l-band', 'l-band--lg', bandTone].filter(Boolean).join(' ')}>
      <div className={['l-container', centered ? 'l-stack l-stack--800' : ''].filter(Boolean).join(' ')}>
        {centered ? (
          <>
            {copy}
            <Media {...(media || {})} ratio={media?.ratio || '16 / 9'} label={media?.label || 'Product visual'} />
          </>
        ) : (
          <div className="hero-split" style={{ display: 'grid', gap: 'var(--space-900)', alignItems: 'center' }}>
            {copy}
            <Media {...(media || {})} ratio={media?.ratio || '4 / 5'} label={media?.label || 'Product visual'} />
          </div>
        )}
      </div>
    </section>
  )
}
