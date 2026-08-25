/** Partner / merchant strip. Items are `{ name, src? }` — text renders when no image. */
export default function LogoStrip({ title, items = [], background = 'subtle' }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''
  return (
    <section className={['l-band', 'l-band--tight', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--400">
        {title && <p className="t-caption t-center" style={{ fontWeight: 600, letterSpacing: '0.04em' }}>{title}</p>}
        <ul
          className="l-row"
          style={{ justifyContent: 'center', gap: 'var(--space-800)', rowGap: 'var(--space-500)' }}
        >
          {items.map((item) => (
            <li key={item.name}>
              {item.src
                ? <img src={item.src} alt={item.name} style={{ height: 'var(--logo-h)', opacity: 0.7 }} loading="lazy" />
                : <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--text-disabled)' }}>{item.name}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
