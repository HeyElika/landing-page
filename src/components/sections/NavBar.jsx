import { useEffect, useState } from 'react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import BilleaseIcon from '../../assets/icons/BilleaseIcon'

/**
 * Sticky top navigation. The bottom border only appears once the page is
 * scrolled, matching the NavHeader behaviour in the product.
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
        borderBottom: `var(--border-width-100) solid ${scrolled ? 'var(--border-subtle)' : 'transparent'}`,
        transition: 'border-color 160ms ease',
      }}
    >
      <div
        className="l-container"
        style={{
          height: 'var(--nav-h)',
          paddingInline: 'var(--page-gutter)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-600)',
        }}
      >
        <a href={brand.href || '#top'} aria-label={brand.name || 'Home'} style={{ display: 'flex' }}>
          <Logo src={brand.logo} name={brand.name} />
        </a>

        <nav aria-label="Primary" className="nav-desktop" style={{ display: 'none', gap: 'var(--space-600)' }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--text-subtle)' }}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-desktop" style={{ display: 'none', gap: 'var(--space-300)', alignItems: 'center' }}>
          {secondaryCta && <Button {...secondaryCta} variant="outline" size="sm" />}
          {cta && <Button {...cta} size="sm" />}
        </div>

        <button
          type="button"
          className="nav-mobile-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'var(--control-md)',
            height: 'var(--control-md)',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: 'var(--bg-subtle)',
            cursor: 'pointer',
          }}
        >
          <BilleaseIcon name={open ? 'close' : 'burger-menu'} size="md" color="var(--icon-base)" />
        </button>
      </div>

      {open && (
        <div
          className="nav-mobile-panel"
          style={{
            borderTop: 'var(--border-width-100) solid var(--border-subtle)',
            padding: 'var(--space-400) var(--page-gutter) var(--space-600)',
            background: 'var(--bg-base)',
          }}
        >
          <nav aria-label="Primary" className="l-stack l-stack--200" style={{ marginBottom: 'var(--space-400)' }}>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ padding: 'var(--space-300) 0', fontSize: 'var(--text-lg)', fontWeight: 600 }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="l-stack l-stack--200">
            {cta && <Button {...cta} block />}
            {secondaryCta && <Button {...secondaryCta} variant="outline" block />}
          </div>
        </div>
      )}
    </header>
  )
}
