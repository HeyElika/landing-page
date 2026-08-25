import BilleaseIcon from '../../assets/icons/BilleaseIcon'

/**
 * Chip. Composed from foundations: the Billease library has no chip component
 * to reuse, so this follows the radius and colour rules rather than inventing
 * a look. See DESIGN-RULES.md section 9.
 */
export default function Badge({ label, tone = 'primary', icon }) {
  const tones = {
    primary: '',
    neutral: 'c-badge--neutral',
    success: 'c-badge--success',
    info: 'c-badge--info',
    onDark: 'c-badge--on-dark',
  }
  return (
    <span className={['c-badge', 'body-sm-semibold', tones[tone] ?? ''].filter(Boolean).join(' ')}>
      {icon && <BilleaseIcon name={icon} size="xs" />}
      {label}
    </span>
  )
}
