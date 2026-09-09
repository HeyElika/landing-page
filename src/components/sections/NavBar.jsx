import { useEffect, useRef, useState } from 'react'
import Logo from '../ui/Logo'
import Cta from '../ui/Cta'
import Icon from '../../assets/icons/Icon'

/**
 * Sticky top navigation.
 *
 * Hides on the way down and returns on the way up, so the page has the whole
 * screen while the reader is moving forward and the action is one gesture away
 * the moment they look for it.
 *
 * It also returns at the foot of the page and stays there. Someone who has
 * reached the end has finished reading, and the alternative is a footer with
 * no way back to the action except scrolling up.
 *
 * `mobileMenu: false` drops the burger. On a single-page layout the links are
 * anchors to sections the reader reaches by scrolling anyway, and the sticky
 * bar already carries the action — so the menu is a panel, an overlay, a focus
 * trap and a scroll lock in service of four shortcuts. A page with genuinely
 * separate destinations should keep it.
 */
export default function NavBar({ brand = {}, links = [], cta, secondaryCta, mobileMenu = true }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  // Reads are throttled to a frame so a fast scroll cannot queue up work.
  useEffect(() => {
    let last = window.scrollY
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const y = window.scrollY
        setScrolled(y > 0)

        const doc = document.documentElement
        // A couple of pixels of tolerance: sub-pixel layout and elastic
        // scrolling mean the numbers rarely land exactly equal.
        const atBottom = window.innerHeight + y >= doc.scrollHeight - 2

        const delta = y - last
        // Ignore jitter, and never hide near the top, at the foot of the
        // page, or while the mobile menu is open.
        if (Math.abs(delta) > 6) {
          setHidden(delta > 0 && y > 160 && !atBottom)
          last = y
        } else if (atBottom) {
          setHidden(false)
        }
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // An open overlay has to be escapable and has to hold focus. Without this a
  // keyboard user tabs straight past the panel into the page behind it, which
  // is still there and still scrollable to a screen reader.
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    const focusable = () => [...(panel?.querySelectorAll('a[href], button:not([disabled])') ?? [])]

    focusable()[0]?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()   // put the cursor back where it started
        return
      }
      if (e.key !== 'Tab') return
      const items = focusable()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header
      className="c-nav"
      style={{
        borderBottom: `var(--border-width-xs) solid ${scrolled ? 'var(--border-subtle)' : 'transparent'}`,
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 260ms ease, border-color 160ms ease',
        // The gutter sits on the header, not on .l-container, so the nav shares
        // exactly the content box every l-band uses. Putting it inside the
        // container instead offsets the nav by one gutter above 1264px.
        paddingInline: 'var(--page-gutter)',
      }}
    >
      <div
        className="l-container"
        style={{
          height: 'var(--nav-h)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-600)',
        }}
      >
        <a href={brand.href || '#top'} aria-label={brand.name || 'Home'} style={{ display: 'flex' }}>
          <Logo src={brand.logo} name={brand.name} />
        </a>

        {/* The links sit next to the logo and the action at the far end, as
            billease.ph does. Grouping them all on the right left the bar
            lopsided: a logo alone against a cluster. */}
        {/* A header carrying an action and no links has nothing to collapse
            into a burger, so it must not hide below the breakpoint: doing that
            left the phone with a logo and no way to act. */}
        <div
          className={links.length ? 'nav-desktop' : 'nav-actions'}
          style={{ flex: 1, gap: 'var(--space-600)', alignItems: 'center' }}
        >
          <nav aria-label="Primary" className="l-row" style={{ gap: 'var(--space-500)', flexWrap: 'nowrap' }}>
            {links.map((l) => (
              <a key={l.href} href={l.href} className="body-md-regular t-subtle">{l.label}</a>
            ))}
          </nav>

          {/* Actions ride to the far end. Keeping them in their own group means
              a page with two of them stays a pair, rather than one drifting
              into the middle of the bar. Same size as every other primary
              action on the page, so the button does not change shape when the
              reader scrolls past the hero. */}
          <div className="l-row" style={{ marginInlineStart: 'auto', gap: 'var(--space-300)', alignItems: 'center', flexWrap: 'nowrap' }}>
            {secondaryCta && <Cta {...secondaryCta} type="secondary" />}
            {cta && <Cta {...cta} />}
          </div>
        </div>

        {/* Only when the page asked for it and there is something behind it. */}
        {mobileMenu && (links.length > 0 || cta || secondaryCta) && (
        <button
          ref={toggleRef}
          type="button"
          className="nav-mobile-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => {
            // Opening the menu must never leave the header off-screen.
            setHidden(false)
            setOpen((v) => !v)
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 'var(--icon-size-xl)',
            height: 'var(--icon-size-xl)',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: 'var(--bg-subtle)',
            cursor: 'pointer',
          }}
        >
          <Icon name={open ? 'close' : 'burger-menu'} size="md" color="var(--icon-base)" />
        </button>
        )}
      </div>

      {mobileMenu && open && (
        <div
          ref={panelRef}
          className="nav-mobile-panel"
          style={{
            borderTop: 'var(--border-width-xs) solid var(--border-subtle)',
            paddingBlock: 'var(--space-400) var(--space-600)',
            background: 'var(--bg-base)',
          }}
        >
          <nav aria-label="Primary" className="l-container l-stack l-stack--200" style={{ marginBottom: 'var(--space-400)' }}>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="heading-sm-semibold"
                style={{ padding: 'var(--space-300) 0' }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
