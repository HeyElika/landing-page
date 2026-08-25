import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Media from '../ui/Media'
import BilleaseIcon from '../../assets/icons/BilleaseIcon'

/**
 * Hero. `layout: 'split'` puts the media beside the copy, `'centered'`
 * stacks it underneath. Both read the same content keys.
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

  const copy = (
    <div className={['l-stack', 'l-stack--600', layout === 'centered' ? 'c-section-head--center' : ''].filter(Boolean).join(' ')}>
      <div className="l-stack l-stack--400">
        {badge && <span><Badge {...badge} tone={onDark ? 'onDark' : badge.tone} /></span>}
        {title && <h1 className={['t-display', 't-balance', onDark ? 't-on-dark' : ''].filter(Boolean).join(' ')}>{title}</h1>}
        {description && <p className={['t-lead', onDark ? 't-on-dark-subtle' : ''].filter(Boolean).join(' ')} style={{ maxWidth: '54ch' }}>{description}</p>}
      </div>

      {ctas.length > 0 && (
        <div className="l-row" style={{ justifyContent: layout === 'centered' ? 'center' : 'flex-start' }}>
          {ctas.map((c, i) => (
            <Button
              key={c.label}
              {...c}
              variant={c.variant || (i === 0 ? (onDark ? 'on-dark' : 'primary') : (onDark ? 'on-dark-outline' : 'outline'))}
            />
          ))}
        </div>
      )}

      {note && <p className={['t-caption', onDark ? 't-on-dark-subtle' : ''].filter(Boolean).join(' ')}>{note}</p>}

      {highlights.length > 0 && (
        <ul className="l-row" style={{ gap: 'var(--space-600)', justifyContent: layout === 'centered' ? 'center' : 'flex-start' }}>
          {highlights.map((h) => (
            <li key={h.label} className="l-row" style={{ gap: 'var(--space-200)' }}>
              <BilleaseIcon name={h.icon || 'tick'} size="sm" color={onDark ? 'var(--icon-on-dark)' : 'var(--icon-success)'} />
              <span className={['t-small', onDark ? 't-on-dark-subtle' : ''].filter(Boolean).join(' ')} style={{ fontWeight: 600 }}>{h.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  return (
    <section id="top" className={['l-band', 'l-band--lg', bandTone].filter(Boolean).join(' ')}>
      <div className={['l-container', layout === 'centered' ? 'l-stack l-stack--800' : ''].filter(Boolean).join(' ')}>
        {layout === 'split' ? (
          <div
            style={{
              display: 'grid',
              gap: 'var(--space-900)',
              gridTemplateColumns: 'var(--hero-cols, 1fr)',
              alignItems: 'center',
            }}
            className="hero-split"
          >
            {copy}
            <Media {...(media || {})} ratio={media?.ratio || '4 / 5'} label={media?.label || 'Product image'} />
          </div>
        ) : (
          <>
            {copy}
            <Media {...(media || {})} ratio={media?.ratio || '16 / 9'} label={media?.label || 'Product image'} />
          </>
        )}
      </div>
    </section>
  )
}
