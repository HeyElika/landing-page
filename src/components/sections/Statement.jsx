import { useEffect, useRef } from 'react'
import Cta from '../ui/Cta'

/**
 * A single statement on an otherwise empty screen.
 *
 * The lines converge as the section reaches the middle of the viewport: each
 * one slides in from alternating sides and darkens from grey to full contrast,
 * settling when the section is centred. Scroll-scrubbed rather than a one-shot
 * reveal — the movement tracks the reader's scroll in both directions, which
 * is what makes it feel attached to the page rather than played at them.
 *
 * Progress is written to a single custom property on the section and the CSS
 * does the rest, so the scroll handler touches one element per frame however
 * many lines there are.
 *
 * Content shape:
 *   { lines: ['First line', 'Second line'], ctas: [{ label, href }] }
 */
export default function Statement({ lines = [], ctas = [], background = 'default' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1')
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 0
      if (!vh) return
      // 1 when the section is centred in the viewport, falling away either
      // side. The span is generous so the movement is a long, slow settle
      // rather than a snap as the section crosses the middle.
      const distance = Math.abs(rect.top + rect.height / 2 - vh / 2)
      const p = Math.max(0, Math.min(1, 1 - distance / (vh * 0.7)))
      el.style.setProperty('--p', p.toFixed(3))
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''

  return (
    <section ref={ref} className={['l-band', 'c-statement', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container c-statement__inner">
        <h2 className="c-statement__head display-lg">
          {lines.map((line, i) => (
            // Odd lines arrive from the left, even from the right.
            <span key={line} className="c-statement__line" style={{ '--dir': i % 2 === 0 ? -1 : 1 }}>
              {line}
            </span>
          ))}
        </h2>

        {ctas.length > 0 && (
          <div className="l-row c-statement__actions">
            {ctas.map((c, i) => (
              <Cta key={c.label} {...c} type={c.type || (i === 0 ? 'primary' : 'ghost')} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
