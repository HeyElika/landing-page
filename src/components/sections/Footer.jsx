import Logo from '../ui/Logo'
import Icon from '../../assets/icons/Icon'

/**
 * Footer. `legal` holds regulatory copy as an array of paragraphs; it must be
 * the wording Legal approved, never a paraphrase.
 */
export default function Footer({ brand = {}, columns = [], legal = [], social = [], bottomLinks = [], copyright }) {
  return (
    <footer className="l-band l-band--dark">
      <div className="l-container l-stack l-stack--800">
        <div className="footer-top" style={{ display: 'grid', gap: 'var(--space-800)' }}>
          <div className="l-stack l-stack--300">
            <Logo src={brand.logoOnDark || brand.logo} name={brand.name} onDark />
            {brand.tagline && <p className="body-sm-regular t-on-dark-subtle l-measure">{brand.tagline}</p>}
            {social.length > 0 && (
              <ul className="l-row" style={{ gap: 'var(--space-300)' }}>
                {social.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      aria-label={s.name}
                      target="_blank"
                      rel="noreferrer noopener"
                      style={{
                        display: 'grid',
                        placeItems: 'center',
                        width: 'var(--icon-size-xl)',
                        height: 'var(--icon-size-xl)',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--alpha-white-10)',
                      }}
                    >
                      <Icon name={s.icon || 'link'} size="sm" color="var(--icon-on-dark)" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {columns.map((col) => (
            <nav key={col.title} className="l-stack l-stack--300" aria-label={col.title}>
              <h3 className="heading-xs-semibold t-on-dark">{col.title}</h3>
              <ul className="l-stack l-stack--200">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="body-sm-regular t-on-dark-subtle">{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {legal.length > 0 && (
          <div
            className="l-stack l-stack--200"
            style={{ borderTop: 'var(--border-width-xs) solid var(--alpha-white-20)', paddingTop: 'var(--space-600)' }}
          >
            {legal.map((p, i) => <p key={i} className="body-xs-regular t-on-dark-subtle">{p}</p>)}
          </div>
        )}

        <div className="l-row" style={{ justifyContent: 'space-between', gap: 'var(--space-400)' }}>
          <p className="body-xs-regular t-on-dark-subtle">{copyright}</p>
          {bottomLinks.length > 0 && (
            <ul className="l-row" style={{ gap: 'var(--space-500)' }}>
              {bottomLinks.map((l) => (
                <li key={l.label}><a href={l.href} className="body-xs-regular t-on-dark-subtle">{l.label}</a></li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
