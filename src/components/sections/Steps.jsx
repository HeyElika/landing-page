import SectionHead from '../ui/SectionHead'
import Icon from '../../assets/icons/Icon'

/** Numbered "how it works" row. Each item: { title, description }. */
export default function Steps({ title, description, items = [], background = 'default', cta }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''
  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--900">
        <SectionHead title={title} description={description} />
        <ol className={`l-grid l-grid--${Math.min(items.length, 4) || 3}`}>
          {items.map((item, i) => (
            <li key={item.title} className="l-stack l-stack--300">
              {/* Same marker as StepsSplit: outlined and neutral. Red is for
                  actions and brand emphasis, not for numbering. */}
              <span className="c-steps-split__num heading-sm-semibold">
                {i + 1}
              </span>
              <h3 className="heading-md-semibold">{item.title}</h3>
              {item.description && <p className="body-md-regular">{item.description}</p>}
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
