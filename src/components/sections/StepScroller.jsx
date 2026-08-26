import { useEffect, useRef, useState } from 'react'
import SectionHead from '../ui/SectionHead'
import Media from '../ui/Media'

/**
 * Steps that advance as the section scrolls.
 *
 * The section is a tall track containing a sticky viewport-height stage. While
 * the track passes the viewport the stage stays put and the active step
 * changes, so one scroll gesture walks through the sequence instead of moving
 * past four separate blocks.
 *
 * It does not hijack scrolling. The page keeps moving at its normal speed and
 * the step index is derived from how far through the track the reader is, so a
 * fast flick or a jump to an anchor never traps them.
 *
 * Below 900px the whole mechanism switches off in CSS and the steps render as
 * a plain stacked list. Sticky sequences are a poor fit for a short viewport,
 * and every step is worth reading on a phone.
 *
 * Content shape:
 *   steps: [{ title, description, media: { src, alt, label, ratio } }]
 */
export default function StepScroller({ title, description, steps = [], background = 'default' }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''

  useEffect(() => {
    const track = trackRef.current
    if (!track || steps.length < 2) return
    // The sticky stage only runs at desktop widths; below that the steps are
    // laid out in flow and there is no active index to track.
    const mq = window.matchMedia('(min-width: 900px)')
    let frame = 0

    const measure = () => {
      frame = 0
      if (!mq.matches) { setActive(0); return }
      const rect = track.getBoundingClientRect()
      const stage = track.firstElementChild?.getBoundingClientRect().height ?? 0
      const scrollable = rect.height - stage
      if (scrollable <= 0) return
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 0.999)
      setActive(Math.floor(progress * steps.length))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure) }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [steps.length])

  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--900">
        <SectionHead title={title} description={description} align="start" />

        <div
          ref={trackRef}
          className="c-steps"
          style={{ '--step-count': steps.length }}
        >
          <div className="c-steps__stage">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={['c-steps__step', i === active ? 'is-active' : ''].filter(Boolean).join(' ')}
                aria-hidden={i !== active || undefined}
              >
                <div className="c-steps__copy l-stack l-stack--400">
                  <span className="c-steps__num body-sm-semibold">{i + 1}</span>
                  <h3 className="display-sm t-balance">{step.title}</h3>
                  {step.description && <p className="body-md-regular l-measure">{step.description}</p>}
                </div>

                <div className="c-steps__media">
                  <Media {...(step.media || {})} ratio={step.media?.ratio || '4 / 5'} label={step.media?.label || `Step ${i + 1}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Progress marks. Not controls — the sequence is driven by scroll. */}
          <ol className="c-steps__progress" aria-hidden="true">
            {steps.map((step, i) => (
              <li key={step.title} className={i === active ? 'is-active' : ''} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
