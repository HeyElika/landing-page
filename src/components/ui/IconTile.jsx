import BilleaseIcon from '../../assets/icons/BilleaseIcon'

export default function IconTile({ icon, tone = 'primary' }) {
  const tones = {
    primary: { cls: '', color: 'var(--icon-primary)' },
    neutral: { cls: 'c-icon-tile--neutral', color: 'var(--icon-base)' },
    info: { cls: 'c-icon-tile--info', color: 'var(--icon-info-bold)' },
    success: { cls: 'c-icon-tile--success', color: 'var(--icon-success)' },
    onDark: { cls: 'c-icon-tile--on-dark', color: 'var(--icon-on-dark)' },
  }
  const t = tones[tone] ?? tones.primary
  if (!icon) return null
  return (
    <span className={['c-icon-tile', t.cls].filter(Boolean).join(' ')}>
      <BilleaseIcon name={icon} size="md" color={t.color} />
    </span>
  )
}
