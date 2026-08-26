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
 * `apps[].src` takes the official store badge artwork when it is available.
 * Until then each renders as a labelled button.
 */
export default function AppDownload({ title, description, media, apps = [] }) {
  return (
    <section className="l-band l-band--tight">
      <div className="l-container">
        <div className="c-appcta">
          <div className="c-appcta__media">
            <Media {...(media || {})} ratio={media?.ratio || '3 / 4'} label={media?.label || 'App screen'} />
          </div>

          <div className="c-appcta__copy l-stack l-stack--600">
            <div className="l-stack l-stack--300">
              {title && <h2 className="display-md t-on-dark">{title}</h2>}
              {description && <p className="body-lg-regular t-on-dark-subtle">{description}</p>}
            </div>

            {apps.length > 0 && (
              <ul className="l-row" style={{ gap: 'var(--space-300)' }}>
                {apps.map((app) => (
                  <li key={app.name}>
                    <a
                      href={app.href}
                      className="c-store-btn body-sm-semibold"
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
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
