import { useState } from 'react'
import SectionHead from '../ui/SectionHead'
import BilleaseIcon from '../../assets/icons/BilleaseIcon'

/** Accordion. Each item: { question, answer }. One open at a time. */
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
            return (
              <li key={item.question} style={{ borderTop: 'var(--border-width-100) solid var(--border-subtle)' }}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
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
                    fontSize: 'var(--copy-md)',
                    fontWeight: 600,
                    color: 'var(--text-base)',
                  }}
                >
                  {item.question}
                  <BilleaseIcon name={open ? 'chevron-up' : 'chevron-down'} size="sm" color="var(--icon-subtle)" />
                </button>
                {open && <p className="t-body" style={{ paddingBottom: 'var(--space-500)' }}>{item.answer}</p>}
              </li>
            )
          })}
        </ul>
        {footerLink && (
          <p className="t-small t-center">
            {footerLink.text} <a className="c-link" href={footerLink.href}>{footerLink.label}</a>
          </p>
        )}
      </div>
    </section>
  )
}
