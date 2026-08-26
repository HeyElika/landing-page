import SectionHead from '../ui/SectionHead'
import Icon from '../../assets/icons/Icon'

/**
 * "Security and control" — step 6 of the narrative in DESIGN-RULES.md
 * section 10.
 *
 * Short, benefit-led reassurance. Only list capabilities that actually exist:
 * security claims are on the never-invent list in rule 16.
 */
export default function Security({ title, description, items = [], background = 'dark' }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', dark: 'l-band--dark' }[background] || ''
  const onDark = background === 'dark'
  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--900">
        <SectionHead title={title} description={description} onDark={onDark} />
        <ul className={`l-grid l-grid--${Math.min(items.length, 3) || 3}`}>
          {items.map((item) => (
            <li key={item.title} className="l-stack l-stack--300">
              <Icon
                name={item.icon || 'security'}
                size="lg"
                color={onDark ? 'var(--icon-on-dark)' : 'var(--icon-base)'}
              />
              <h3 className={['heading-md-semibold', onDark ? 't-on-dark' : ''].filter(Boolean).join(' ')}>{item.title}</h3>
              {item.description && (
                <p className={['body-md-regular', onDark ? 't-on-dark-subtle' : ''].filter(Boolean).join(' ')}>{item.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
