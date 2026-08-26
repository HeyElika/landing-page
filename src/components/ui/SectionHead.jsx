/**
 * Heading and supporting copy at the top of a section.
 *
 * There is deliberately no eyebrow. Small-caps labels above every heading added
 * a second line of type to each section without adding meaning — the heading
 * already says what the section is.
 *
 * Type follows the landing-page hierarchy: section heading is display-md,
 * supporting copy is body-lg-regular.
 */
export default function SectionHead({ title, description, align = 'center', onDark = false }) {
  if (!title && !description) return null
  return (
    <header className={['c-section-head', align === 'center' ? 'c-section-head--center' : ''].filter(Boolean).join(' ')}>
      {title && <h2 className={['display-md', 't-balance', onDark ? 't-on-dark' : ''].filter(Boolean).join(' ')}>{title}</h2>}
      {description && (
        <p className={['body-lg-regular', onDark ? 't-on-dark-subtle' : 't-subtle'].join(' ')}>{description}</p>
      )}
    </header>
  )
}
