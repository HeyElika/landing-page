import { useEffect, useState } from 'react'
import Logo from '../ui/Logo'
import Cta from '../ui/Cta'
import Icon from '../../assets/icons/Icon'

/**
 * Sticky top navigation. The bottom border appears only once the page is
 * scrolled, matching NavHeader behaviour in the Billease app.
 */
export default function NavBar({ brand = {}, links = [], cta, secondaryCta }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg-base)',
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

        <nav aria-label="Primary" className="nav-desktop" style={{ gap: 'var(--space-600)' }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="body-sm-semibold t-subtle">{l.label}</a>
          ))}
        </nav>

        <div className="nav-desktop" style={{ gap: 'var(--space-300)', alignItems: 'center' }}>
          {secondaryCta && <Cta {...secondaryCta} type="secondary" size="md" />}
          {cta && <Cta {...cta} size="md" />}
        </div>

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
