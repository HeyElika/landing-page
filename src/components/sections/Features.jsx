import SectionHead from '../ui/SectionHead'
import IconTile from '../ui/IconTile'
import Media from '../ui/Media'
import Icon from '../../assets/icons/Icon'

/**
 * Benefit grid. `columns` accepts 2, 3 or 4.
 *
 * `width: 'wide'` drops the 1200px content column and runs the row to the page
 * gutters. Four cards inside the column are 276px each, which is narrower than
 * their own copy wants; at full width they grow with the screen.
 *
 * `fit: 'viewport'` holds the section to one screen and squares the cards, so
 * the row reads as one set of identical objects rather than three boxes of
 * whatever height their copy happened to need.
 * DESIGN-RULES.md caps benefits at three or four on an activation page, so
 * prefer a short list over a full grid when the page is conversion-focused.
 */
export default function Features({
  title,
  label,
  description,
  items = [],
  columns = 3,
  align = 'center',
  fit = 'auto',            // 'auto' | 'viewport' — hold the section to one screen
  background = 'default',
  variant = 'card',
  width = 'default',      // 'default' | 'wide' — 'wide' runs to the page edges
}) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken', dark: 'l-band--dark' }[background] || ''
  const onDark = background === 'dark'
  return (
    <section
      className={['l-band', fit === 'viewport' ? 'l-band--fit' : '', bandTone].filter(Boolean).join(' ')}
      aria-label={!title ? (label || undefined) : undefined}
    >
      <div className={['l-container', width === 'wide' ? 'l-container--wide' : '', 'l-stack', 'l-stack--900'].filter(Boolean).join(' ')}>
        <SectionHead title={title} description={description} align={align} onDark={onDark} />
        <ul className={`l-grid l-grid--${columns}`}>
          {items.map((item) => {
            // An item with a visual becomes one object: the image fills the
            // card and the copy sits on it under a scrim. Copy beneath the
            // panel made each item read as two things stacked.
            if (item.media) {
              const { ratio = '2 / 3', label, ...media } = item.media
              return (
                <li key={item.title} className="c-feature" style={{ '--ratio': ratio }}>
                  <Media {...media} ratio={ratio} label={label || item.title} className="c-feature__img" />
                  <div className="c-feature__copy l-stack l-stack--300">
                    <h3 className="display-sm t-on-dark">{item.title}</h3>
                    {item.description && (
                      <p className="body-md-regular t-on-dark-subtle">{item.description}</p>
                    )}
                  </div>
                  {/* Only when the card actually leads somewhere. An arrow on a
                    * card that does nothing promises a page that isn't there. */}
                  {item.href && (
                    <a className="c-feature__arrow" href={item.href} aria-label={item.title}>
                      <Icon name="arrow-right" size="sm" color="var(--icon-on-dark)" />
                    </a>
                  )}
                </li>
              )
            }
            return (
              <li
                key={item.title}
                className={variant === 'card'
                  ? ['c-card', onDark ? 'c-card--on-dark' : '', background === 'default' ? 'c-card--tinted' : ''].filter(Boolean).join(' ')
                  : ''}
              >
                <div className="l-stack l-stack--300">
                  <IconTile icon={item.icon} tone={onDark ? 'onDark' : item.tone} />
                  <h3 className={['heading-md-semibold', onDark ? 't-on-dark' : ''].filter(Boolean).join(' ')}>{item.title}</h3>
                  {item.description && (
                    <p className={['body-md-regular', onDark ? 't-on-dark-subtle' : ''].filter(Boolean).join(' ')}>{item.description}</p>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
