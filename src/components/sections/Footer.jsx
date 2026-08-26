import Logo from '../ui/Logo'

/**
 * Footer.
 *
 * Structured like a bank's: identity and link columns across the top with the
 * app links beside them, then contact and the regulatory statement, then the
 * copyright row.
 *
 * `legal` must be the approved regulatory wording, never a paraphrase.
 * `badges` renders the regulator marks when their image files are supplied,
 * and `apps` the store links.
 *
 * No rules between the blocks: spacing separates them.
 */
export default function Footer({
  brand = {},
  columns = [],
  appsTitle,
  apps = [],
  contact = [],
  legal = [],
  badges = [],
  social = [],
  bottomLinks = [],
  copyright,
}) {
  return (
    <footer className="l-band l-band--tight c-footer">
      <div className="l-container l-stack l-stack--900">

        {/* Identity, links, app stores */}
        <div className="c-footer__top">
          <a href={brand.href || '/'} aria-label={brand.name || 'Home'} style={{ display: 'flex' }}>
            <Logo src={brand.logoOnDark || brand.logo} name={brand.name} />
          </a>

          <div className="c-footer__links">
            {columns.map((col) => (
              <nav key={col.title} className="l-stack l-stack--300" aria-label={col.title}>
                <p className="body-sm-semibold t-on-dark">{col.title}</p>
                {col.links.map((l) => (
                  <a key={l.label} href={l.href} className="body-sm-regular t-on-dark-subtle">{l.label}</a>
                ))}
              </nav>
            ))}
          </div>

          {apps.length > 0 && (
            <div className="c-footer__apps-block l-stack l-stack--300">
              {appsTitle && <p className="body-sm-semibold t-on-dark">{appsTitle}</p>}
              <ul className="c-footer__apps l-stack l-stack--200">
              {apps.map((app) => (
                <li key={app.name}>
                  <a
                    href={app.href}
                    className="c-footer__app body-sm-semibold"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {app.src
                      ? <img src={app.src} alt={app.name} style={{ height: 'var(--space-900)' }} loading="lazy" />
                      : app.name}
                  </a>
                </li>
              ))}
              </ul>
            </div>
          )}
        </div>

        {/* Contact, regulatory statement, socials */}
        <div className="c-footer__mid">
          <div className="l-stack l-stack--300">
            {contact.length > 0 && (
              <ul className="l-stack l-stack--100">
                {contact.map((c) => (
                  <li key={c.label}>
                    <a href={c.href} className="body-md-semibold t-on-dark">{c.label}</a>
                  </li>
                ))}
              </ul>
            )}
            {legal.map((p, i) => (
              <p key={i} className="body-xs-regular t-on-dark-subtle">{p}</p>
            ))}
            {badges.length > 0 && (
              <ul className="l-row" style={{ gap: 'var(--space-400)' }}>
                {badges.map((b) => (
                  <li key={b.name}>
                    {b.src
                      ? <img src={b.src} alt={b.name} style={{ height: 'var(--space-800)' }} loading="lazy" />
                      : <span className="body-xxs-semibold t-on-dark-subtle">{b.name}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {social.length > 0 && (
            <ul className="l-row c-footer__social" style={{ gap: 'var(--space-400)' }}>
              {social.map((s) => (
                <li key={s.name}>
                  <a href={s.href} className="body-sm-regular t-on-dark-subtle" target="_blank" rel="noreferrer noopener">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Copyright and legal links */}
        <div className="c-footer__bottom">
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
