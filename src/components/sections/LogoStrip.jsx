/** Partner strip. Items are `{ name, src }`; text renders when no image. */
export default function LogoStrip({ title, items = [], background = 'subtle' }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''
  return (
    <section className={['l-band', 'l-band--tight', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--400">
        {title && <p className="label-xs t-subtle t-center">{title}</p>}
        <ul className="l-row" style={{ justifyContent: 'center', gap: 'var(--space-800)', rowGap: 'var(--space-500)' }}>
          {items.map((item) => (
            <li key={item.name}>
              {item.src
                ? <img src={item.src} alt={item.name} style={{ height: 'var(--space-700)' }} loading="lazy" />
                : <span className="heading-md-semibold" style={{ color: 'var(--text-disabled)' }}>{item.name}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
