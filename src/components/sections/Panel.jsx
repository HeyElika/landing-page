import Cta from '../ui/Cta'
import Media from '../ui/Media'
import Icon from '../../assets/icons/Icon'

/**
 * A contained moment: tinted rounded panel, copy beside an image.
 *
 * Pattern borrowed from Monzo, who use it to lift one idea out of the page
 * flow. It earns its place because a long page of full-width bands reads as
 * one unbroken column; a panel is a single object and gives the eye somewhere
 * to stop.
 *
 * Content keys:
 *   eyebrow, title, paragraphs[] (or description), bullets[], cta, link, media
 *   tone     'subtle' | 'brand' | 'info' | 'success' | 'sunken'
 *   reverse  put the media on the left at desktop width
 *
 * If `cta` is set it must carry the page's single primary action, worded
 * identically. A second competing action here splits intent — use `link` for
 * anything softer.
 */
export default function Panel({
  eyebrow,
  title,
  description,
  paragraphs = [],
  bullets = [],
  cta,
  link,
  media,
  tone = 'subtle',
  reverse = false,
  background = 'default',
}) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''
  const copy = description ? [description, ...paragraphs] : paragraphs

  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container">
        <div className={['c-panel', tone !== 'subtle' ? `c-panel--${tone}` : ''].filter(Boolean).join(' ')}>
          <div className={['c-panel__grid', reverse ? 'c-panel__grid--reverse' : ''].filter(Boolean).join(' ')}>
            <div className="c-panel__copy l-stack l-stack--400">
              {eyebrow && <p className="label-xs t-brand">{eyebrow}</p>}
              {title && <h2 className="display-sm t-balance">{title}</h2>}

              {copy.map((p) => (
                <p key={p} className="body-md-regular t-subtle">{p}</p>
              ))}

              {bullets.length > 0 && (
                <ul className="l-stack l-stack--200">
                  {bullets.map((b) => (
                    <li
                      key={b}
                      className="l-row body-md-regular"
                      style={{ gap: 'var(--space-200)', alignItems: 'flex-start', flexWrap: 'nowrap' }}
                    >
                      <Icon name="tick" size="sm" color="var(--icon-success-bold)" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {(cta || link) && (
                <div className="l-row">
                  {cta && <Cta {...cta} />}
                  {link && (
                    <a className="c-link link-md" href={link.href}>
                      {link.label}
                      <Icon name="chevron-right" size="xs" color="var(--icon-active)" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="c-panel__media">
              <Media {...(media || {})} ratio={media?.ratio || '4 / 3'} label={media?.label || 'Photo'} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
