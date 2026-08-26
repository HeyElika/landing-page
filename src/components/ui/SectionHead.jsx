/**
 * Eyebrow, heading and description block at the top of most sections.
 *
 * Type styles follow the landing-page hierarchy in DESIGN-RULES.md:
 * section heading is heading-lg-bold, supporting copy is body-md-regular,
 * eyebrow is label-xs.
 */
export default function SectionHead({ eyebrow, title, description, align = 'center', onDark = false }) {
  if (!eyebrow && !title && !description) return null
  return (
    <header className={['c-section-head', align === 'center' ? 'c-section-head--center' : ''].filter(Boolean).join(' ')}>
      {eyebrow && <p className={['label-xs', onDark ? 't-on-dark-subtle' : 't-subtle'].join(' ')}>{eyebrow}</p>}
      {title && <h2 className={['display-md', 't-balance', onDark ? 't-on-dark' : ''].filter(Boolean).join(' ')}>{title}</h2>}
      {description && (
        <p className={['body-lg-regular', onDark ? 't-on-dark-subtle' : 't-subtle'].join(' ')}>{description}</p>
      )}
    </header>
  )
}
