import SectionHead from '../ui/SectionHead'
import Icon from '../../assets/icons/Icon'

/**
 * "Important things to know" — step 5 of the narrative in DESIGN-RULES.md
 * section 10, and required by section 11.
 *
 * This section exists so that fees, limits, timing and repayment implications
 * appear ON the page, before the FAQ. Never move this content into the FAQ or
 * into legal small print: rule 16 requires transparency over conversion.
 *
 * Styling is deliberately plain. Status colours are not used decoratively
 * here; a condition is information, not a warning.
 */
export default function Conditions({ title, description, items = [], background = 'default', note }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''
  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-container--narrow l-stack l-stack--900">
        <SectionHead title={title} description={description} align="start" />
        <ul className="l-stack l-stack--400">
          {items.map((item) => (
            <li
              key={item.title}
              className="l-row"
              style={{
                gap: 'var(--space-400)',
                alignItems: 'flex-start',
                flexWrap: 'nowrap',
                borderTop: 'var(--border-width-xs) solid var(--border-subtle)',
                paddingTop: 'var(--space-400)',
              }}
            >
              <Icon name={item.icon || 'document'} size="md" color="var(--icon-subtle)" />
              <span className="l-stack l-stack--100">
                <span className="heading-md-semibold">{item.title}</span>
                <span className="body-md-regular">{item.detail}</span>
              </span>
            </li>
          ))}
        </ul>
        {note && <p className="body-xs-regular t-subtle">{note}</p>}
      </div>
    </section>
  )
}
