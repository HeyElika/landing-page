import SectionHead from '../ui/SectionHead'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import BilleaseIcon from '../../assets/icons/BilleaseIcon'

/**
 * Plans or terms. Each plan: { name, price, unit, description, features[],
 * cta, featured?, badge? }. Use `note` for the required rate disclosure.
 */
export default function Pricing({ eyebrow, title, description, plans = [], note, background = 'subtle' }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''
  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--800">
        <SectionHead eyebrow={eyebrow} title={title} description={description} />
        <ul className={`l-grid l-grid--${Math.min(plans.length, 4) || 3}`} style={{ alignItems: 'stretch' }}>
          {plans.map((plan) => (
            <li
              key={plan.name}
              className="c-card c-card--raised l-stack l-stack--400"
              style={{
                borderColor: plan.featured ? 'var(--border-primary)' : undefined,
                borderWidth: plan.featured ? 'var(--border-width-200)' : undefined,
              }}
            >
              <div className="l-stack l-stack--200">
                <div className="l-row" style={{ justifyContent: 'space-between' }}>
                  <h3 className="t-h4">{plan.name}</h3>
                  {plan.badge && <Badge label={plan.badge} />}
                </div>
                {plan.description && <p className="t-small">{plan.description}</p>}
              </div>

              <div className="l-row" style={{ gap: 'var(--space-100)', alignItems: 'baseline' }}>
                <span className="t-h2">{plan.price}</span>
                {plan.unit && <span className="t-small">{plan.unit}</span>}
              </div>

              {plan.features?.length > 0 && (
                <ul className="l-stack l-stack--200" style={{ flex: 1 }}>
                  {plan.features.map((f) => (
                    <li key={f} className="l-row" style={{ gap: 'var(--space-200)', alignItems: 'flex-start', flexWrap: 'nowrap' }}>
                      <BilleaseIcon name="tick" size="xs" color="var(--icon-success)" style={{ marginTop: 5 }} />
                      <span className="t-small" style={{ color: 'var(--text-base)' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              )}

              {plan.cta && <Button {...plan.cta} variant={plan.featured ? 'primary' : 'outline'} block />}
            </li>
          ))}
        </ul>
        {note && <p className="t-caption t-center" style={{ maxWidth: 680, marginInline: 'auto' }}>{note}</p>}
      </div>
    </section>
  )
}
