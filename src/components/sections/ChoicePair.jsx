import SectionHead from '../ui/SectionHead'
import Badge from '../ui/Badge'
import Media from '../ui/Media'
import Icon from '../../assets/icons/Icon'

/**
 * Two large cards side by side, each offering a route the reader can take.
 *
 * Copy sits at the top of the card and the visual fills what is left, so the
 * two read as a pair even when their copy runs to different lengths. The cards
 * are a fixed proportion rather than a fixed height, so they stay matched at
 * any width.
 *
 * Content shape:
 *   items: [{ badge, title, description, href, media, tone }]
 *
 * `tone` picks the card fill from the token surfaces. Left alone the cards are
 * neutral, which is the right default until real artwork exists.
 */
export default function ChoicePair({ title, description, items = [], background = 'default' }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''

  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--900">
        <SectionHead title={title} description={description} align="start" />

        <ul className="c-choice">
          {items.map((item) => {
            const Tag = item.href ? 'a' : 'div'
            return (
              <li key={item.title}>
                <Tag
                  {...(item.href ? { href: item.href } : {})}
                  className={['c-choice__card', item.tone ? `c-choice__card--${item.tone}` : ''].filter(Boolean).join(' ')}
                >
                  <div className="c-choice__copy l-stack l-stack--300">
                    {item.badge && <span><Badge label={item.badge} type="secondary-subtle" /></span>}
                    <h3 className="display-sm t-balance">{item.title}</h3>
                    {item.description && <p className="body-md-regular">{item.description}</p>}
                  </div>

                  {item.media && (
                    <div className="c-choice__media">
                      <Media {...item.media} ratio={item.media.ratio || '4 / 3'} label={item.media.label || item.title} />
                    </div>
                  )}

                  {item.href && (
                    <span className="c-choice__go" aria-hidden="true">
                      <Icon name="chevron-right" size="sm" color="var(--icon-base)" />
                    </span>
                  )}
                </Tag>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
