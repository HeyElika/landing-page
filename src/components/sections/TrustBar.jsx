import Icon from '../../assets/icons/Icon'

/**
 * Compact trust strip: app rating, adoption, and regulator marks.
 *
 * Every fintech reference page carries one of these — Wise leads with a
 * Trustpilot score and review count, Salmon with an App Store rating plus
 * BSP/SEC/AMLC seals, Atome with SEC and DTI marks. It earns its place because
 * a lending product has to answer "can I trust you" before "what does it cost".
 *
 * This is NOT a vanity statistics band. Each figure must be a real, current
 * number: rule 16 forbids inventing them, so unconfirmed values stay marked.
 */
export default function TrustBar({ items = [], badges = [], note, background = 'subtle' }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''
  return (
    <section className={['l-band', 'l-band--tight', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--400">
        <ul
          className="l-row"
          style={{ justifyContent: 'center', gap: 'var(--space-800)', rowGap: 'var(--space-500)' }}
        >
          {items.map((item) => (
            <li key={item.label} className="l-row" style={{ gap: 'var(--space-300)', flexWrap: 'nowrap' }}>
              {item.icon && <Icon name={item.icon} size="md" color="var(--icon-subtle)" />}
              <span className="l-stack">
                <span className="heading-sm-semibold">{item.value}</span>
                <span className="body-xs-regular t-subtle">{item.label}</span>
              </span>
            </li>
          ))}

          {badges.map((b) => (
            <li key={b.name}>
              {b.src
                ? <img src={b.src} alt={b.name} style={{ height: 'var(--space-900)' }} loading="lazy" />
                : (
                  <span
                    className="body-xs-semibold"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      height: 'var(--space-900)',
                      paddingInline: 'var(--space-300)',
                      borderRadius: 'var(--radius-sm)',
                      border: 'var(--border-width-xs) solid var(--border-subtle)',
                      color: 'var(--text-subtle)',
                    }}
                  >
                    {b.name}
                  </span>
                )}
            </li>
          ))}
        </ul>
        {note && <p className="body-xs-regular t-subtle t-center">{note}</p>}
      </div>
    </section>
  )
}
