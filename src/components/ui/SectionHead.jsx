/**
 * Eyebrow + heading + description block used at the top of most sections.
 * Every section passes its content straight through from the product file.
 */
export default function SectionHead({ eyebrow, title, description, align = 'center', onDark = false }) {
  if (!eyebrow && !title && !description) return null
  return (
    <header className={['c-section-head', align === 'center' ? 'c-section-head--center' : ''].filter(Boolean).join(' ')}>
      {eyebrow && <p className="t-eyebrow">{eyebrow}</p>}
      {title && <h2 className={['t-h2', 't-balance', onDark ? 't-on-dark' : ''].filter(Boolean).join(' ')}>{title}</h2>}
      {description && <p className={['t-lead', onDark ? 't-on-dark-subtle' : ''].filter(Boolean).join(' ')}>{description}</p>}
    </header>
  )
}
