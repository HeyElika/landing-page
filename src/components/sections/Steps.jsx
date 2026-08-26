import SectionHead from '../ui/SectionHead'
import Icon from '../../assets/icons/Icon'

/** Numbered "how it works" row. Each item: { title, description }. */
export default function Steps({ eyebrow, title, description, items = [], background = 'default', cta }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''
  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--900">
        <SectionHead eyebrow={eyebrow} title={title} description={description} />
        <ol className={`l-grid l-grid--${Math.min(items.length, 4) || 3}`}>
          {items.map((item, i) => (
            <li key={item.title} className="l-stack l-stack--300">
              <span
                className="heading-sm-semibold"
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 'var(--icon-size-xl)',
                  height: 'var(--icon-size-xl)',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-on-dark)',
                }}
              >
                {i + 1}
              </span>
              <h3 className="heading-md-semibold">{item.title}</h3>
              {item.description && <p className="body-md-regular t-subtle">{item.description}</p>}
            </li>
          ))}
        </ol>
        {cta && (
          <div className="l-row" style={{ justifyContent: 'center' }}>
            <a className="c-link link-md" href={cta.href}>
              {cta.label}
              <Icon name="chevron-right" size="xs" color="var(--icon-active)" />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
