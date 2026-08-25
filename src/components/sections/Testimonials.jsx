import SectionHead from '../ui/SectionHead'

/** Quote cards. Each item: { quote, name, role, avatar? }. */
export default function Testimonials({ eyebrow, title, description, items = [], background = 'default' }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''
  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--800">
        <SectionHead eyebrow={eyebrow} title={title} description={description} />
        <ul className={`l-grid l-grid--${Math.min(items.length, 3) || 3}`}>
          {items.map((item) => (
            <li key={item.name} className="c-card l-stack l-stack--400">
              <p className="t-body" style={{ color: 'var(--text-base)' }}>{`"${item.quote}"`}</p>
              <div className="l-row" style={{ gap: 'var(--space-300)', marginTop: 'auto' }}>
                {item.avatar
                  ? <img src={item.avatar} alt="" style={{ width: 'var(--control-md)', height: 'var(--control-md)', borderRadius: 'var(--radius-full)', objectFit: 'cover' }} loading="lazy" />
                  : (
                    <span style={{
                      width: 'var(--control-md)', height: 'var(--control-md)', borderRadius: 'var(--radius-full)', background: 'var(--bg-sunken)',
                      display: 'grid', placeItems: 'center', fontWeight: 700, color: 'var(--text-subtle)',
                    }}>{item.name?.[0]}</span>
                  )}
                <span className="l-stack">
                  <span style={{ fontSize: 'var(--text-md)', fontWeight: 600 }}>{item.name}</span>
                  {item.role && <span className="t-caption">{item.role}</span>}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
