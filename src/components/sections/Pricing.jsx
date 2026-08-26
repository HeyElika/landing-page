import SectionHead from '../ui/SectionHead'
import Cta from '../ui/Cta'
import Badge from '../ui/Badge'
import Icon from '../../assets/icons/Icon'

/**
 * Terms or plans.
 *
 * FINANCIAL GUARDRAIL: never generate figures here. Fees, interest, limits and
 * repayment terms must come from confirmed product content, and `note` must
 * carry the disclosure approved by Legal. See DESIGN-RULES.md section 16.
 */
export default function Pricing({ eyebrow, title, description, plans = [], note, background = 'subtle' }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''
  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--900">
        <SectionHead eyebrow={eyebrow} title={title} description={description} />
        <ul className={`l-grid l-grid--${Math.min(plans.length, 4) || 3}`} style={{ alignItems: 'stretch' }}>
          {plans.map((plan) => (
            <li
              key={plan.name}
              className="c-card l-stack l-stack--400"
              style={{
                borderColor: plan.featured ? 'var(--border-brand-primary)' : undefined,
                borderWidth: plan.featured ? 'var(--border-width-sm)' : undefined,
              }}
            >
              <div className="l-stack l-stack--200">
                <div className="l-row" style={{ justifyContent: 'space-between' }}>
                  <h3 className="heading-sm-semibold">{plan.name}</h3>
                  {plan.badge && <Badge label={plan.badge} />}
                </div>
                {plan.description && <p className="body-sm-regular t-subtle">{plan.description}</p>}
              </div>

              <div className="l-row" style={{ gap: 'var(--space-100)', alignItems: 'baseline' }}>
                <span className="heading-lg-bold">{plan.price}</span>
                {plan.unit && <span className="body-sm-regular t-subtle">{plan.unit}</span>}
              </div>

              {plan.features?.length > 0 && (
                <ul className="l-stack l-stack--200" style={{ flex: 1 }}>
                  {plan.features.map((f) => (
                    <li key={f} className="l-row body-sm-regular" style={{ gap: 'var(--space-200)', alignItems: 'flex-start', flexWrap: 'nowrap' }}>
                      <Icon name="tick" size="xs" color="var(--icon-success-bold)" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}

              {plan.cta && <Cta {...plan.cta} type={plan.featured ? 'primary' : 'secondary'} block />}
            </li>
          ))}
        </ul>
        {note && <p className="body-xs-regular t-subtle t-center" style={{ maxWidth: 'var(--measure)', marginInline: 'auto' }}>{note}</p>}
      </div>
    </section>
  )
}
