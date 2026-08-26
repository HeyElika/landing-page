import { useState } from 'react'
import SectionHead from '../ui/SectionHead'
import Icon from '../../assets/icons/Icon'

/**
 * FAQ accordion, following the Klarna pattern.
 *
 * Questions are organised into groups. Each group is a quiet row with a
 * chevron; opening one drops its questions in beneath, numbered. Grouping is
 * the point: it keeps the section to a few scannable rows however many
 * questions sit behind them, instead of a long ladder of individual questions.
 *
 * The rows run the full width of the page while the answers inside them stay
 * on a reading measure — a row is a control and reads better wide, a paragraph
 * does not.
 *
 * Content shape:
 *   groups: [{ label, items: [{ question, answer }] }]
 *
 * A flat `items` array is still accepted and is treated as a single unlabelled
 * group, so existing pages keep working.
 *
 * Important conditions belong on the page before this section, never only
 * inside it.
 */
export default function FAQ({ title, description, groups, items = [], background = 'default', footerLink }) {
  const resolved = groups?.length ? groups : (items.length ? [{ label: null, items }] : [])

  // Groups open and close independently, and opening one never closes another.
  //
  // A single-open accordion is what made the page jump: opening a lower group
  // collapsed the one above it, so the row under the cursor slid upward while
  // its own panel expanded, and the reader lost their place. Here nothing above
  // the clicked row ever changes height, so the row stays exactly where it is
  // and the page only grows downward.
  const [openIds, setOpenIds] = useState(() => new Set())
  const toggle = (i) =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''

  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--900">
        <SectionHead title={title} description={description} align="start" />

        <ul className="l-stack l-stack--100">
          {resolved.map((group, i) => {
            const open = openIds.has(i)
            const panelId = `faq-panel-${i}`
            return (
              <li key={group.label ?? i} className={open ? 'c-faq c-faq--open' : 'c-faq'}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="c-faq__q heading-md-semibold"
                >
                  <span>{group.label ?? title}</span>
                  <span className="c-faq__icon">
                    <Icon name="chevron-down" size="md" color="var(--icon-subtle)" />
                  </span>
                </button>

                {/* Always rendered so the panel can animate open and closed.
                    It is hidden from assistive tech while collapsed. */}
                <div className="c-faq__panel" aria-hidden={!open}>
                  <div>
                    <div id={panelId} className="c-faq__a l-stack l-stack--400">
                      {group.items.map((item, n) => (
                        <div key={item.question} className="l-stack l-stack--100">
                          <p className="body-md-semibold">{`${n + 1}. ${item.question}`}</p>
                          <p className="body-md-regular">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        {footerLink && (
          <p className="body-md-regular">
            {footerLink.text} <a className="c-link link-md" href={footerLink.href}>{footerLink.label}</a>
          </p>
        )}
      </div>
    </section>
  )
}
