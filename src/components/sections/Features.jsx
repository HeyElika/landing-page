import SectionHead from '../ui/SectionHead'
import IconTile from '../ui/IconTile'

/** Card grid. `columns` accepts 2, 3 or 4. Each item: { icon, title, description }. */
export default function Features({ eyebrow, title, description, items = [], columns = 3, align = 'center', background = 'default', variant = 'card' }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken', dark: 'l-band--dark' }[background] || ''
  const onDark = background === 'dark'
  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--800">
        <SectionHead eyebrow={eyebrow} title={title} description={description} align={align} onDark={onDark} />
        <ul className={`l-grid l-grid--${columns}`}>
          {items.map((item) => (
            <li
              key={item.title}
              className={variant === 'card' ? ['c-card', onDark ? 'c-card--on-dark' : ''].filter(Boolean).join(' ') : ''}
            >
              <div className="l-stack l-stack--300">
                <IconTile icon={item.icon} tone={onDark ? 'onDark' : item.tone} />
                <h3 className={['t-h4', onDark ? 't-on-dark' : ''].filter(Boolean).join(' ')}>{item.title}</h3>
                {item.description && <p className={onDark ? 't-body t-on-dark-subtle' : 't-body'}>{item.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
