import Media from '../ui/Media'
import BilleaseIcon from '../../assets/icons/BilleaseIcon'
import SectionHead from '../ui/SectionHead'

/**
 * Alternating media/copy rows. Each row: { title, description, bullets[], media, link }.
 * Rows flip sides automatically; set `reverse: true` on a row to force it.
 */
export default function Spotlight({ eyebrow, title, description, rows = [], background = 'default' }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''
  return (
    <section className={['l-band', 'l-band--lg', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--900">
        <SectionHead eyebrow={eyebrow} title={title} description={description} />
        {rows.map((row, i) => {
          const flipped = row.reverse ?? i % 2 === 1
          return (
            <div key={row.title} className="spotlight-row" style={{ display: 'grid', gap: 'var(--space-800)', alignItems: 'center' }}>
              <div className="l-stack l-stack--400" style={{ order: flipped ? 2 : 1 }}>
                {row.eyebrow && <p className="t-eyebrow">{row.eyebrow}</p>}
                <h3 className="t-h3 t-balance">{row.title}</h3>
                {row.description && <p className="t-body">{row.description}</p>}
                {row.bullets?.length > 0 && (
                  <ul className="l-stack l-stack--200">
                    {row.bullets.map((b) => (
                      <li key={b} className="l-row" style={{ gap: 'var(--space-200)', alignItems: 'flex-start', flexWrap: 'nowrap' }}>
                        <BilleaseIcon name="tick" size="sm" color="var(--icon-success)" style={{ marginTop: 3 }} />
                        <span className="t-body" style={{ color: 'var(--text-base)' }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {row.link && <a className="c-link" href={row.link.href}>{row.link.label}<BilleaseIcon name="chevron-right" size="xs" /></a>}
              </div>
              <div style={{ order: flipped ? 1 : 2 }}>
                <Media {...(row.media || {})} ratio={row.media?.ratio || '4 / 3'} label={row.media?.label || 'Feature image'} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
