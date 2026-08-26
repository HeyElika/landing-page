import Icon from '../../assets/icons/Icon'

/**
 * Icon container. Composed from foundations — the Billease library has no icon
 * container component to reuse — so it follows the radius and semantic icon
 * tokens rather than inventing a look.
 *
 * Red is deliberately not available here. Brand red is reserved for primary
 * actions and brand emphasis (DESIGN-RULES.md section 4); it is not an icon
 * colour. The default is a neutral tile with a base-coloured icon.
 */
const TONES = {
  neutral: { cls: 'c-icon-tile--neutral', color: 'var(--icon-base)' },
  info: { cls: 'c-icon-tile--info', color: 'var(--icon-active)' },
  success: { cls: 'c-icon-tile--success', color: 'var(--icon-success-bold)' },
  onDark: { cls: 'c-icon-tile--on-dark', color: 'var(--icon-on-dark)' },
}

export default function IconTile({ icon, tone = 'neutral' }) {
  if (!icon) return null
  const t = TONES[tone] ?? TONES.neutral
  return (
    <span className={['c-icon-tile', t.cls].filter(Boolean).join(' ')}>
      <Icon name={icon} size="md" color={t.color} />
    </span>
  )
}
