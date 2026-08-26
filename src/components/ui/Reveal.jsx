import { useEffect, useRef } from 'react'

/**
 * Reveals its children once they scroll into view.
 *
 * The hidden state is applied by CSS only after this component marks the
 * document ready, so if JavaScript never runs the content is simply visible —
 * a reveal effect must never be able to hide the page.
 *
 * Reduced-motion is handled in CSS: the transition is dropped and the content
 * is visible from the start.
 */
export default function Reveal({ children, immediate = false }) {
  const ref = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-reveal-ready', '')
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (immediate || typeof IntersectionObserver === 'undefined') {
      el.setAttribute('data-revealed', '')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        entry.target.setAttribute('data-revealed', '')
        io.unobserve(entry.target)   // reveal once; never re-hide on scroll back
      },
      // Starts once the block is a little way into the viewport, so the
      // movement reads as a response to scrolling rather than something that
      // already happened off-screen.
      { threshold: 0.12, rootMargin: '0px 0px -12% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [immediate])

  return (
    <div ref={ref} data-reveal="">
      {children}
    </div>
  )
}
