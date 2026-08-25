import DSButton from '../ds/Button'

/**
 * Maps a call-to-action content object onto the Billease design system Button.
 *
 * The library Button is the only button on these pages. This file exists to
 * translate content keys into its variant names, not to restyle it.
 *
 *   { label, href, type, size, icon }
 *
 * `type` accepts the Figma variant names: primary | secondary | gradient |
 * ghost | ghost-destructive.
 */
export default function Cta({ label, href, type = 'primary', size = 'lg', icon, onDark = false, block = false, onClick }) {
  // On a dark or brand band the filled red button loses contrast against the
  // background, so the library's secondary variant carries the action instead.
  const resolvedType = onDark && type === 'primary' ? 'secondary' : type

  return (
    <DSButton
      type={resolvedType}
      size={size}
      label={label}
      href={href}
      onClick={onClick}
      fullWidth={block}
      iconRight={Boolean(icon)}
      iconName={icon}
    />
  )
}
