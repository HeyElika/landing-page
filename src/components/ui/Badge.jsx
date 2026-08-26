import Icon from '../../assets/icons/Icon'

/**
 * Badge — mirrors the Billease `badge/item` component set, Figma node
 * 10025:7085 in file qESeTFW1GEEosrYnm4Hu3b.
 *
 * Read from Figma, not invented. There are exactly three types:
 *
 *   tertriary         bg/subtle       + text/subtle
 *   secondary-subtle  bg/info-subtle  + text/active
 *   primary           bg/primary      + text/on-dark
 *
 * Sizes: sm = 22px tall, body-xxs-semibold. md = 29px tall, body-sm-semibold.
 * Shapes: default = radius/sm (4px), round = radius/full. `default` is the
 * default here — Billease does not use fully rounded chips. Only pass
 * shape="round" if a specific design calls for it.
 * Inline padding spacing/200.
 *
 * There is no pale-red variant. An earlier version of this file invented one;
 * if a page needs red it uses `primary`, which is a solid fill with white text.
 */
const TYPES = {
  tertriary: { background: 'var(--bg-subtle)', color: 'var(--text-subtle)' },
  'secondary-subtle': { background: 'var(--bg-info-subtle)', color: 'var(--text-active)' },
  primary: { background: 'var(--bg-primary)', color: 'var(--text-on-dark)' },
}

const SIZES = {
  sm: { height: 22, cls: 'body-xxs-semibold', icon: 'xs' },
  md: { height: 29, cls: 'body-sm-semibold', icon: 'xs' },
}

export default function Badge({ label, type = 'tertriary', shape = 'default', size = 'sm', icon }) {
  const t = TYPES[type] ?? TYPES.tertriary
  const s = SIZES[size] ?? SIZES.sm

  return (
    <span
      className={s.cls}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-100)',
        height: s.height,
        paddingInline: 'var(--space-200)',
        borderRadius: shape === 'round' ? 'var(--radius-full)' : 'var(--radius-sm)',
        whiteSpace: 'nowrap',
        ...t,
      }}
    >
      {icon && <Icon name={icon} size={s.icon} />}
      {label}
    </span>
  )
}
