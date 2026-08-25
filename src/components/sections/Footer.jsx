import Logo from '../ui/Logo'

/**
 * Footer, modelled on billease.ph but reduced to essentials.
 *
 * The live site uses a light footer with one flat row of links, the
 * regulatory statement, regulator badges, socials and a copyright line.
 * This keeps that shape and drops the parts a product landing page does not
 * need, so it stays a single readable band rather than a four-column block.
 *
 * `legal` must be the approved regulatory wording. `badges` renders the
 * regulator marks (NPC, SEC, BSP) when their image files are supplied.
 */
export default function Footer({
  brand = {},
  links = [],
  legal = [],
  badges = [],
  social = [],
  copyright,
}) {
  return (
    <footer
      className="l-band l-band--tight"
      style={{
        background: 'var(--bg-subtle)',
        borderTop: 'var(--border-width-xs) solid var(--border-subtle)',
      }}
    >
      <div className="l-container l-stack l-stack--600">
        {/* Logo and primary links */}
        <div
          className="l-row"
          style={{ justifyContent: 'space-between', gap: 'var(--space-600)', alignItems: 'center' }}
        >
          <a href={brand.href || '/'} aria-label={brand.name || 'Home'} style={{ display: 'flex' }}>
            <Logo src={brand.logo} name={brand.name} />
          </a>

          {links.length > 0 && (
            <nav aria-label="Footer">
              <ul className="l-row" style={{ gap: 'var(--space-500)', rowGap: 'var(--space-300)' }}>
                {links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="body-sm-regular t-subtle">{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Regulatory statement and regulator badges */}
        {(legal.length > 0 || badges.length > 0) && (
          <div
            className="l-stack l-stack--400"
            style={{ borderTop: 'var(--border-width-xs) solid var(--border-subtle)', paddingTop: 'var(--space-500)' }}
          >
            {legal.map((p, i) => (
              <p key={i} className="body-xs-regular t-subtle">{p}</p>
            ))}
            {badges.length > 0 && (
              <ul className="l-row" style={{ gap: 'var(--space-500)' }}>
                {badges.map((b) => (
                  <li key={b.name}>
                    {b.src
                      ? <img src={b.src} alt={b.name} style={{ height: 'var(--space-900)' }} loading="lazy" />
                      : <span className="body-xxs-regular" style={{ color: 'var(--text-disabled)' }}>{b.name}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Copyright and socials */}
        <div
          className="l-row"
          style={{
            justifyContent: 'space-between',
            gap: 'var(--space-400)',
            borderTop: 'var(--border-width-xs) solid var(--border-subtle)',
            paddingTop: 'var(--space-400)',
          }}
        >
          <p className="body-xs-regular t-subtle">{copyright}</p>
          {social.length > 0 && (
            <ul className="l-row" style={{ gap: 'var(--space-400)' }}>
              {social.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    className="body-xs-regular t-subtle"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
