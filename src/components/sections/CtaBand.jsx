import Button from '../ui/Button'
import Media from '../ui/Media'

/** Closing call to action. `stores` renders app-store badge images or text links. */
export default function CtaBand({ title, description, ctas = [], stores = [], media, background = 'brand', note }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', dark: 'l-band--dark', brand: 'l-band--brand' }[background] || ''
  const onDark = background === 'dark' || background === 'brand'

  const copy = (
    <div className={['l-stack', 'l-stack--600', media ? '' : 'c-section-head--center'].filter(Boolean).join(' ')}>
      <div className="l-stack l-stack--300">
        {title && <h2 className={['t-h2', 't-balance', onDark ? 't-on-dark' : ''].filter(Boolean).join(' ')}>{title}</h2>}
        {description && <p className={onDark ? 't-lead t-on-dark-subtle' : 't-lead'}>{description}</p>}
      </div>
      <div className="l-row" style={{ justifyContent: media ? 'flex-start' : 'center' }}>
        {ctas.map((c, i) => (
          <Button
            key={c.label}
            {...c}
            variant={c.variant || (i === 0 ? (onDark ? 'on-dark' : 'primary') : (onDark ? 'on-dark-outline' : 'outline'))}
          />
        ))}
      </div>
      {stores.length > 0 && (
        <ul className="l-row" style={{ justifyContent: media ? 'flex-start' : 'center' }}>
          {stores.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noreferrer noopener" aria-label={s.name}>
                {s.src
                  ? <img src={s.src} alt={s.name} style={{ height: 'var(--store-badge-h)' }} />
                  : (
                    <span className="c-btn c-btn--sm" style={{ background: onDark ? 'var(--alpha-white-10)' : 'var(--bg-sunken)', color: onDark ? 'var(--text-on-dark)' : 'var(--text-base)' }}>
                      {s.name}
                    </span>
                  )}
              </a>
            </li>
          ))}
        </ul>
      )}
      {note && <p className={onDark ? 't-caption t-on-dark-subtle' : 't-caption'}>{note}</p>}
    </div>
  )

  return (
    <section className={['l-band', 'l-band--lg', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container">
        {media ? (
          <div className="hero-split" style={{ display: 'grid', gap: 'var(--space-800)', alignItems: 'center' }}>
            {copy}
            <Media {...media} ratio={media.ratio || '4 / 3'} label={media.label || 'App image'} />
          </div>
        ) : copy}
      </div>
    </section>
  )
}
