import { useState } from 'react'
import SectionHead from '../ui/SectionHead'
import Icon from '../../assets/icons/Icon'

/**
 * Accordion. One panel open at a time, keyboard accessible through native
 * button semantics. The Billease library has no accordion component to reuse,
 * so this is composed from foundations. See DESIGN-RULES.md section 9.
 *
 * Important conditions must appear on the page BEFORE this section, never
 * only inside it.
 */
export default function FAQ({ eyebrow, title, description, items = [], background = 'default', footerLink }) {
  const [openIndex, setOpenIndex] = useState(0)
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''

  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-container--narrow l-stack l-stack--800">
        <SectionHead eyebrow={eyebrow} title={title} description={description} />
        <ul className="l-stack">
          {items.map((item, i) => {
            const open = openIndex === i
            const panelId = `faq-panel-${i}`
            return (
              <li key={item.question} style={{ borderTop: 'var(--border-width-xs) solid var(--border-subtle)' }}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="heading-sm-semibold"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--space-400)',
                    padding: 'var(--space-500) 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: 'var(--text-base)',
                  }}
                >
                  {item.question}
                  <Icon name={open ? 'chevron-up' : 'chevron-down'} size="sm" color="var(--icon-subtle)" />
                </button>
                {open && (
                  <p id={panelId} className="body-sm-regular t-subtle" style={{ paddingBottom: 'var(--space-500)' }}>
                    {item.answer}
                  </p>
                )}
              </li>
            )
          })}
        </ul>
        {footerLink && (
          <p className="body-sm-regular t-subtle t-center">
            {footerLink.text} <a className="c-link link-sm" href={footerLink.href}>{footerLink.label}</a>
          </p>
        )}
      </div>
    </section>
  )
}
