import Cta from '../ui/Cta'
import Media from '../ui/Media'

/** Closing call to action. Repeats the page's single primary action. */
export default function CtaBand({ title, description, ctas = [], stores = [], media, background = 'brand', note }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', dark: 'l-band--dark', brand: 'l-band--brand' }[background] || ''
  const onDark = background === 'dark' || background === 'brand'

  const copy = (
    <div className={['l-stack', 'l-stack--600', media ? '' : 'c-section-head--center'].filter(Boolean).join(' ')}>
      <div className="l-stack l-stack--300">
        {title && <h2 className={['display-md', 't-balance', onDark ? 't-on-dark' : ''].filter(Boolean).join(' ')}>{title}</h2>}
        {description && (
          <p className={['body-lg-regular', onDark ? 't-on-dark-subtle' : ''].filter(Boolean).join(' ')}>{description}</p>
        )}
      </div>
      <div className="l-row" style={{ justifyContent: media ? 'flex-start' : 'center' }}>
        {ctas.map((c, i) => (
          <Cta key={c.label} {...c} type={c.type || (i === 0 ? 'primary' : 'ghost')} onDark={onDark} />
        ))}
      </div>
      {stores.length > 0 && (
        <ul className="l-row" style={{ justifyContent: media ? 'flex-start' : 'center' }}>
          {stores.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noreferrer noopener" aria-label={s.name}>
                {s.src
                  ? <img src={s.src} alt={s.name} style={{ height: 'var(--space-900)' }} />
                  : (
                    <span
                      className="body-sm-semibold"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        height: 'var(--space-900)',
                        paddingInline: 'var(--space-400)',
                        borderRadius: 'var(--radius-md)',
                        background: onDark ? 'var(--alpha-white-10)' : 'var(--bg-sunken)',
                        color: onDark ? 'var(--text-on-dark)' : 'var(--text-base)',
                      }}
                    >
                      {s.name}
                    </span>
                  )}
              </a>
            </li>
          ))}
        </ul>
      )}
      {note && <p className={['body-xs-regular', onDark ? 't-on-dark-subtle' : 't-subtle'].join(' ')}>{note}</p>}
    </div>
  )

  return (
    <section className={['l-band', 'l-band--lg', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container">
        {media ? (
          <div className="hero-split" style={{ display: 'grid', gap: 'var(--space-800)', alignItems: 'center' }}>
            {copy}
            <Media {...media} ratio={media.ratio || '4 / 3'} label={media.label || 'Product visual'} />
          </div>
        ) : copy}
      </div>
    </section>
  )
}
