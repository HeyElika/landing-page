import { useEffect, useRef, useState } from 'react'
import Cta from './Cta'

/**
 * Mobile-only sticky activation bar.
 *
 * Appears once the hero CTA has scrolled out of view and disappears again when
 * the user scrolls back up, so the primary action is always one tap away
 * without repeating call-to-action blocks down the page.
 *
 * Deliberately mobile only: on desktop the sticky header already keeps the
 * action visible, so a second fixed bar would be duplication.
 *
 * Watches the hero via IntersectionObserver rather than a scroll offset, so it
 * stays correct whatever the hero's height is.
 */
export default function StickyCta({ label, watch = '#top', ...cta }) {
  const [visible, setVisible] = useState(false)
  const barRef = useRef(null)

  useEffect(() => {
    const target = document.querySelector(watch)
    if (!target || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: '-72px 0px 0px 0px' },
    )
    io.observe(target)
    return () => io.disconnect()
  }, [watch])

  // Keep the bar from covering the last of the page content.
  useEffect(() => {
    const el = barRef.current
    if (!visible || !el) return
    const pad = `${el.offsetHeight}px`
    document.body.style.setProperty('--sticky-cta-height', pad)
    document.body.classList.add('has-sticky-cta')
    return () => {
      document.body.classList.remove('has-sticky-cta')
      document.body.style.removeProperty('--sticky-cta-height')
    }
  }, [visible])

  if (!label) return null

  return (
    <div ref={barRef} className={['c-sticky-cta', visible ? 'is-visible' : ''].filter(Boolean).join(' ')}>
      <Cta label={label} {...cta} block />
    </div>
  )
}
