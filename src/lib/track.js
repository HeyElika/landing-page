/**
 * One event pipe for every page.
 *
 * Components call `track()`; where the events go is decided once, here, not
 * per page and not per product. Nothing is wired to a vendor: events are
 * pushed to `window.dataLayer` (GTM, GA4 via GTM) and also dispatched as a DOM
 * event, so a page can be instrumented by a tag manager, by a listener in
 * index.html, or by nothing at all.
 *
 * If no consumer exists the call costs one array push. That matters: a landing
 * page should not carry an analytics bundle to send four events.
 *
 * Event names are fixed here rather than passed in, so two pages cannot send
 * "cta_click" and "click_cta" for the same thing.
 */
export const EVENTS = {
  ctaClick: 'cta_click',
  faqOpen: 'faq_open',
  faqClose: 'faq_close',
  sectionView: 'section_view',
  storeClick: 'store_click',
}

export function track(event, props = {}) {
  if (typeof window === 'undefined') return          // prerender: no-op
  const payload = { event, ...props, page: window.location.pathname }
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
  window.dispatchEvent(new CustomEvent('billease:track', { detail: payload }))
}

/**
 * Fires `section_view` once, the first time a section is at least half on
 * screen. Once only: a reader scrolling up and down should not inflate the
 * count of a section they saw once.
 */
export function observeSection(el, name) {
  if (!el || typeof IntersectionObserver === 'undefined') return () => {}
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      track(EVENTS.sectionView, { section: name })
      io.disconnect()
    },
    { threshold: 0.5 },
  )
  io.observe(el)
  return () => io.disconnect()
}
