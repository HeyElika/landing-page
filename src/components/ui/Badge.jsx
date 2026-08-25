import BilleaseIcon from '../../assets/icons/BilleaseIcon'

export default function Badge({ label, tone = 'primary', icon }) {
  const tones = { primary: '', neutral: 'c-badge--neutral', success: 'c-badge--success', info: 'c-badge--info', onDark: 'c-badge--on-dark' }
  return (
    <span className={['c-badge', tones[tone] ?? ''].filter(Boolean).join(' ')}>
      {icon && <BilleaseIcon name={icon} size="xs" />}
      {label}
    </span>
  )
}
