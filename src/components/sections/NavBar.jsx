import { useEffect, useState } from 'react'
import Logo from '../ui/Logo'
import Cta from '../ui/Cta'
import Icon from '../../assets/icons/Icon'

/**
 * Sticky top navigation. It stays put for the whole page; only the bottom
 * border changes, appearing once the page is scrolled, which matches
 * NavHeader behaviour in the Billease app.
 */
export default function NavBar({ brand = {}, links = [], cta, secondaryCta }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // The only thing scroll changes is the border. Reads are throttled to a
  // frame so a fast scroll cannot queue up work.
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        setScrolled(window.scrollY > 0)
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

  return (
    <header
      className="c-nav"
      style={{
        borderBottom: `var(--border-width-xs) solid ${scrolled ? 'var(--border-subtle)' : 'transparent'}`,
        transition: 'border-color 160ms ease',
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

        {/* Links and the action are one group at the right, rather than links
            floating in the middle of the bar. Read as a set, the links are
            clearly the routes and the button the destination. */}
        <div className="nav-desktop" style={{ gap: 'var(--space-600)', alignItems: 'center' }}>
          <nav aria-label="Primary" className="l-row" style={{ gap: 'var(--space-600)', flexWrap: 'nowrap' }}>
            {links.map((l) => (
              <a key={l.href} href={l.href} className="body-sm-semibold t-subtle">{l.label}</a>
            ))}
          </nav>

          {/* Same size as every other primary action on the page. The header
              was the only place using md, so the button changed shape when the
              reader scrolled past the hero. */}
          {secondaryCta && <Cta {...secondaryCta} type="secondary" />}
          {cta && <Cta {...cta} />}
        </div>

        {/* Only when there is something behind it. With no links and no action
            the menu opened onto an empty panel. */}
        {(links.length > 0 || cta || secondaryCta) && (
        <button
          type="button"
          className="nav-mobile-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
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

      {open && (
        <div
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
          <div className="l-container l-stack l-stack--200">
            {cta && <Cta {...cta} block />}
            {secondaryCta && <Cta {...secondaryCta} type="secondary" block />}
          </div>
        </div>
      )}
    </header>
  )
}
