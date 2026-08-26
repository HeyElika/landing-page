import { useState } from 'react'
import SectionHead from '../ui/SectionHead'
import Icon from '../../assets/icons/Icon'

/**
 * FAQ accordion, following the Klarna pattern.
 *
 * One row per question: the row is the question, and opening it reveals that
 * question's answer and nothing else.
 *
 * Groups survive as quiet labels above their rows. They organise a long list
 * without becoming the thing you open — a row that expands into more questions
 * makes the reader open twice to read one answer.
 *
 * The section sits in an 800px column: wide enough that a question and its
 * chevron do not look stranded at either end of the page, narrow enough that
 * the answers underneath stay readable.
 *
 * `answer` may be a string or an array of strings, one per paragraph.
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
  const toggle = (key) =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''

  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-container--list l-stack l-stack--900">
        <SectionHead title={title} description={description} align="start" />

        <div className="l-stack l-stack--800">
          {resolved.map((group, gi) => (
            <div key={group.label ?? gi} className="l-stack l-stack--300">
              {group.label && <p className="body-sm-semibold t-subtle">{group.label}</p>}

              <ul className="l-stack l-stack--100">
                {group.items.map((item, i) => {
                  const key = `${gi}-${i}`
                  const open = openIds.has(key)
                  const panelId = `faq-panel-${gi}-${i}`
                  const paragraphs = Array.isArray(item.answer) ? item.answer : [item.answer]
                  return (
                    <li key={item.question} className={open ? 'c-faq c-faq--open' : 'c-faq'}>
                      <button
                        type="button"
                        onClick={() => toggle(key)}
                        aria-expanded={open}
                        aria-controls={panelId}
                        className="c-faq__q heading-md-semibold"
                      >
                        <span>{item.question}</span>
                        <span className="c-faq__icon">
                          <Icon name="chevron-down" size="sm" color="var(--icon-disabled)" />
                        </span>
                      </button>

                      {/* Always rendered so the panel can animate open and
                          closed. It is hidden from assistive tech while
                          collapsed. */}
                      <div className="c-faq__panel" aria-hidden={!open}>
                        <div>
                          <div id={panelId} className="c-faq__a l-stack l-stack--300">
                            {paragraphs.map((p, n) => (
                              <p key={n} className="body-md-regular">{p}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {footerLink && (
          <p className="body-md-regular">
            {footerLink.text} <a className="c-link link-md" href={footerLink.href}>{footerLink.label}</a>
          </p>
        )}
      </div>
    </section>
  )
}
