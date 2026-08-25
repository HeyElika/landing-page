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
export default function Cta({ label, href, type = 'gradient', size = 'lg', icon, onDark = false, block = false, onClick }) {
  // Gradient is the signature Billease action button and the first variant in
  // the Figma set, so it is the default for a primary call to action.
  // On a dark or brand band a red button loses contrast, so the library's
  // secondary variant carries the action there instead.
  const resolvedType = onDark && (type === 'gradient' || type === 'primary') ? 'secondary' : type

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
