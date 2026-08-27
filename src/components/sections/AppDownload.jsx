import Media from '../ui/Media'

/**
 * App download block: one contained panel, image on one side and the copy with
 * the store links on the other.
 *
 * It sits directly above the footer, so it is a tinted container inside the
 * page rather than a full-width band — the footer is the only full-bleed
 * colour on the page and two of them stacked read as one enormous block.
 *
 * Content shape:
 *   { title, description, media: { src, alt, label, ratio },
 *     apps: [{ name, href, src }] }
 *
 * `tone` picks the panel fill. All three are dark enough to carry white copy,
 * which is what the copy inside assumes.
 *
 * `apps[].src` is the official store badge. Apple and Google both supply the
 * artwork and forbid redrawing it, so a badge renders as the image alone — a
 * white button around it would be a container the badge already has. Without
 * a `src` the entry falls back to a labelled button.
 */
export default function AppDownload({
  title,
  description,
  media,
  apps = [],
  reverse = false,
  tone = 'secondary',   // 'secondary' (blue) | 'dark' | 'brand'
}) {
  const toneClass = { secondary: '', dark: 'c-appcta--dark', brand: 'c-appcta--brand' }[tone] || ''
  return (
    <section className="l-band l-band--tight">
      <div className="l-container">
        <div className={['c-appcta', toneClass, reverse ? 'c-appcta--reverse' : ''].filter(Boolean).join(' ')}>
          <div className="c-appcta__media">
            <Media {...(media || {})} ratio={media?.ratio || '3 / 4'} label={media?.label || 'App screen'} />
          </div>

          <div className="c-appcta__copy l-stack l-stack--600">
            <div className="l-stack l-stack--300">
              {title && <h2 className="display-sm t-on-dark">{title}</h2>}
              {description && <p className="body-lg-regular t-on-dark-subtle">{description}</p>}
            </div>

            {apps.length > 0 && (
              <ul className="l-row" style={{ gap: 'var(--space-300)' }}>
                {apps.map((app) => (
                  <li key={app.name}>
                    <a
                      href={app.href}
                      className={app.src ? 'c-store-badge' : 'c-store-btn body-sm-semibold'}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {app.src ? <img src={app.src} alt={app.name} loading="lazy" /> : app.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
