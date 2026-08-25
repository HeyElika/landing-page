import BilleaseIcon from '../../assets/icons/BilleaseIcon'

/**
 * Marketing button. Colour, radius and weight come from the design system;
 * only the height/padding are marketing-scale (the product Button is sized
 * for a 360px phone screen).
 */
export default function Button({
  href,
  label,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  block = false,
  onClick,
  ...rest
}) {
  const className = [
    'c-btn',
    `c-btn--${variant}`,
    size === 'sm' ? 'c-btn--sm' : '',
    block ? 'c-btn--block' : '',
  ].filter(Boolean).join(' ')

  const iconEl = icon ? <BilleaseIcon name={icon} size={size === 'sm' ? 'xs' : 'sm'} /> : null

  const content = (
    <>
      {icon && iconPosition === 'left' && iconEl}
      {label}
      {icon && iconPosition === 'right' && iconEl}
    </>
  )

  const external = typeof href === 'string' && /^https?:/.test(href)

  if (href) {
    return (
      <a
        className={className}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return <button type="button" className={className} onClick={onClick} {...rest}>{content}</button>
}
