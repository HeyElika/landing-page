import SectionHead from '../ui/SectionHead'
import IconTile from '../ui/IconTile'

/**
 * Benefit grid. `columns` accepts 2, 3 or 4.
 *
 * `fit: 'viewport'` holds the section to one screen and squares the cards, so
 * the row reads as one set of identical objects rather than three boxes of
 * whatever height their copy happened to need.
 * DESIGN-RULES.md caps benefits at three or four on an activation page, so
 * prefer a short list over a full grid when the page is conversion-focused.
 */
export default function Features({
  title,
  description,
  items = [],
  columns = 3,
  align = 'center',
  fit = 'auto',            // 'auto' | 'viewport' — hold the section to one screen
  background = 'default',
  variant = 'card',
}) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken', dark: 'l-band--dark' }[background] || ''
  const onDark = background === 'dark'
  return (
    <section className={['l-band', fit === 'viewport' ? 'l-band--fit' : '', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--900">
        <SectionHead title={title} description={description} align={align} onDark={onDark} />
        <ul className={`l-grid l-grid--${columns}`}>
          {items.map((item) => (
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
          ))}
        </ul>
      </div>
    </section>
  )
}
