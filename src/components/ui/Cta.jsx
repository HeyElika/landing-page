import DSButton from '../ds/Button'
import { track, EVENTS } from '../../lib/track'

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
  // Primary actions use the library `primary` variant. The `gradient` variant
  // exists in the Figma set and is implemented, but is not used on these pages.
  // On a dark or brand band a red button loses contrast, so the library's
  // secondary variant carries the action there instead.
  const resolvedType = onDark && (type === 'gradient' || type === 'primary') ? 'secondary' : type

  return (
    <DSButton
      type={resolvedType}
      size={size}
      label={label}
      href={href}
      onClick={(e) => {
        // Every action on every page reports itself the same way, so a new
        // page needs no tracking work at all.
        track(EVENTS.ctaClick, { label, href })
        onClick?.(e)
      }}
      fullWidth={block}
      iconRight={Boolean(icon)}
      iconName={icon}
    />
  )
}
