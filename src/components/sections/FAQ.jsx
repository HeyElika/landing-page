import { useState } from 'react'
import SectionHead from '../ui/SectionHead'
import Icon from '../../assets/icons/Icon'

/**
 * FAQ accordion.
 *
 * Follows the Klarna pattern: collapsed questions are quiet rows separated by
 * hairlines with a plus on the right; the open one becomes a card, lifted off
 * the band by fill rather than by a border, with the plus turning into a minus.
 * That gives the open answer somewhere to sit instead of pushing the rows
 * apart, which is what a plain accordion does.
 *
 * One open at a time, and it is keyboard accessible through native button
 * semantics.
 *
 * The block spans the full content width as Klarna's does, but the answer text
 * is capped at a readable measure — their answers run the full 1300px, which
 * is a long line to track back from.
 *
 * Important conditions belong on the page before this section, never only
 * inside it.
 */
export default function FAQ({ title, description, items = [], background = 'subtle', footerLink }) {
  const [openIndex, setOpenIndex] = useState(0)
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''

  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--900">
        <SectionHead title={title} description={description} align="start" />

        <ul className="l-stack l-stack--100">
          {items.map((item, i) => {
            const open = openIndex === i
            const panelId = `faq-panel-${i}`
            return (
              <li key={item.question} className={open ? 'c-faq c-faq--open' : 'c-faq'}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="c-faq__q heading-sm-semibold"
                >
                  <span>{item.question}</span>
                  <Icon name={open ? 'minus' : 'plus'} size="md" color="var(--icon-base)" />
                </button>

                {open && (
                  <div id={panelId} className="c-faq__a body-md-regular l-measure">
                    {item.answer}
                  </div>
                )}
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
