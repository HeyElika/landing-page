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
 * Nothing is sent until consent is given. Events raised before then are held
 * in memory and flushed if consent arrives, dropped if it never does. The
 * Philippines' Data Privacy Act makes opt-in the correct default, and a page
 * that measures a visitor before asking is the wrong side of that regardless
 * of what the law strictly requires.
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

const CONSENT_KEY = 'billease.analytics-consent'
let queue = []

/** Has the visitor agreed to being measured? */
export function hasConsent() {
  if (typeof window === 'undefined') return false
  try { return window.localStorage.getItem(CONSENT_KEY) === 'granted' } catch { return false }
}

/**
 * Grant or withdraw consent. Call from a cookie banner, or from the console
 * while testing. Granting flushes anything held since the page loaded;
 * withdrawing drops it.
 */
export function setConsent(granted) {
  if (typeof window === 'undefined') return
  try { window.localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied') } catch { /* private mode */ }
  if (!granted) { queue = []; return }
  const held = queue
  queue = []
  held.forEach(send)
}

function send(payload) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
  window.dispatchEvent(new CustomEvent('billease:track', { detail: payload }))
}

export function track(event, props = {}) {
  if (typeof window === 'undefined') return          // prerender: no-op
  const payload = { event, ...props, page: window.location.pathname }
  if (!hasConsent()) {
    // Held, not sent. Capped so a long session cannot grow unbounded.
    if (queue.length < 50) queue.push(payload)
    return
  }
  send(payload)
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
