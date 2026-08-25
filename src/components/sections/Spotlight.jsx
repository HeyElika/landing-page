import Media from '../ui/Media'
import Icon from '../../assets/icons/Icon'
import SectionHead from '../ui/SectionHead'

/**
 * Alternating media and copy rows. Rows flip sides automatically; set
 * `reverse: true` on a row to force it. On mobile copy always comes first.
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
                {row.eyebrow && <p className="label-xs t-brand">{row.eyebrow}</p>}
                <h3 className="display-sm t-balance">{row.title}</h3>
                {row.description && <p className="body-md-regular t-subtle l-measure">{row.description}</p>}
                {row.bullets?.length > 0 && (
                  <ul className="l-stack l-stack--200">
                    {row.bullets.map((b) => (
                      <li key={b} className="l-row body-sm-regular" style={{ gap: 'var(--space-200)', alignItems: 'flex-start', flexWrap: 'nowrap' }}>
                        <Icon name="tick" size="sm" color="var(--icon-success-bold)" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {row.link && (
                  <a className="c-link link-md" href={row.link.href}>
                    {row.link.label}
                    <Icon name="chevron-right" size="xs" color="var(--icon-active)" />
                  </a>
                )}
              </div>
              <div style={{ order: flipped ? 1 : 2 }}>
                <Media {...(row.media || {})} ratio={row.media?.ratio || '4 / 3'} label={row.media?.label || 'Feature visual'} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
