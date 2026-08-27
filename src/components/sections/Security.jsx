import SectionHead from '../ui/SectionHead'
import Media from '../ui/Media'
import Icon from '../../assets/icons/Icon'

/**
 * Security and control, in two parts: an intro with a visual, then a rule, then
 * a row of supporting points.
 *
 * The split is the point. The intro makes the one claim that matters and gives
 * it a visual; the row underneath carries the specifics without competing with
 * it. A flat grid of three equal points has no lead, so nothing tells the
 * reader what the section is actually promising.
 *
 * Content shape:
 *   title, description, media, link
 *   items: [{ icon, title, description }]
 *
 * Security claims are on the never-invent list. Anything unconfirmed stays
 * marked. See DESIGN-RULES.md section 16.
 */
export default function Security({ title, description, media, link, items = [], reverse = false, background = 'default' }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken', dark: 'l-band--dark' }[background] || ''
  const onDark = background === 'dark'

  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--900">
        <div className={['c-security__intro', reverse ? 'c-security__intro--reverse' : ''].filter(Boolean).join(' ')}>
          <div className="l-stack l-stack--400">
            <SectionHead title={title} description={description} align="start" onDark={onDark} />
            {link && (
              <span>
                <a className="c-link link-md" href={link.href}>
                  {link.label}
                  <Icon name="chevron-right" size="xs" color="var(--icon-active)" />
                </a>
              </span>
            )}
          </div>

          <div className="c-security__media">
            <Media {...(media || {})} ratio={media?.ratio || '4 / 3'} label={media?.label || 'Security visual'} />
          </div>
        </div>

        {items.length > 0 && (
          <ul className={`c-security__items l-grid l-grid--${Math.min(items.length, 3) || 3}`}>
            {items.map((item) => (
              <li key={item.title} className="l-stack l-stack--300">
                <span className="c-security__icon">
                  <Icon name={item.icon || 'security'} size="md" color={onDark ? 'var(--icon-on-dark)' : 'var(--icon-base)'} />
                </span>
                <h3 className={['heading-md-semibold', onDark ? 't-on-dark' : ''].filter(Boolean).join(' ')}>{item.title}</h3>
                {item.description && (
                  <p className={['body-md-regular', onDark ? 't-on-dark-subtle' : ''].filter(Boolean).join(' ')}>{item.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
