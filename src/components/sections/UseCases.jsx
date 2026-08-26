import SectionHead from '../ui/SectionHead'
import Icon from '../../assets/icons/Icon'

/**
 * "Where and how you can use it" — step 3 of the narrative in
 * DESIGN-RULES.md section 10.
 *
 * Concrete supported use cases, not benefits. Only list what Product has
 * confirmed is actually supported; an unconfirmed case is a content
 * dependency, not a guess.
 */
export default function UseCases({ title, description, items = [], background = 'default', note }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''
  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--900">
        <SectionHead title={title} description={description} />
        <ul className={`l-grid l-grid--${Math.min(items.length, 4) || 3}`}>
          {items.map((item) => (
            <li
              key={item.title}
              className="l-row"
              style={{
                gap: 'var(--space-400)',
                alignItems: 'flex-start',
                flexWrap: 'nowrap',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-500)',
              }}
            >
              <Icon name={item.icon || 'card'} size="md" color="var(--icon-base)" />
              <span className="l-stack l-stack--100">
                <span className="heading-sm-semibold">{item.title}</span>
                {item.description && <span className="body-sm-regular t-subtle">{item.description}</span>}
              </span>
            </li>
          ))}
        </ul>
        {note && <p className="body-xs-regular t-subtle t-center">{note}</p>}
      </div>
    </section>
  )
}
