import SectionHead from '../ui/SectionHead'

/** Numbered "how it works" row. Each item: { title, description }. */
export default function Steps({ eyebrow, title, description, items = [], background = 'default', cta }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''
  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--800">
        <SectionHead eyebrow={eyebrow} title={title} description={description} />
        <ol className={`l-grid l-grid--${Math.min(items.length, 4) || 3}`}>
          {items.map((item, i) => (
            <li key={item.title} className="l-stack l-stack--300">
              <span
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 'var(--control-md)',
                  height: 'var(--control-md)',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-on-dark)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </span>
              <h3 className="t-h4">{item.title}</h3>
              {item.description && <p className="t-body">{item.description}</p>}
            </li>
          ))}
        </ol>
        {cta && (
          <div className="l-row" style={{ justifyContent: 'center' }}>
            <a className="c-link" href={cta.href}>{cta.label}</a>
          </div>
        )}
      </div>
    </section>
  )
}
