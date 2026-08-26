import SectionHead from '../ui/SectionHead'
import Media from '../ui/Media'

/**
 * Steps listed as copy beside a single visual.
 *
 * Deliberately static: no sticky stage, no scroll-driven sequence. The reader
 * sees every step at once and can compare them, which is what someone deciding
 * whether to start actually wants. A scroll sequence reveals one step at a
 * time and hides the length of the process behind a gesture.
 *
 * `fit: 'viewport'` holds the section to a single screen on desktop. The
 * heading and the step list take the height they need and the visual takes
 * what is left, so the image scales to the space instead of pushing the
 * section past the fold.
 *
 * Content shape:
 *   steps: [{ title, description }]
 *   media: { src, alt, label, ratio }   — one visual for the whole section
 */
export default function StepsSplit({
  title,
  description,
  steps = [],
  media,
  reverse = false,
  fit = 'auto',          // 'auto' | 'viewport' — hold the section to one screen
  background = 'default',
}) {
  const bandTone = { default: '', subtle: 'l-band--subtle', sunken: 'l-band--sunken' }[background] || ''

  return (
    <section className={['l-band', fit === 'viewport' ? 'l-band--fit' : '', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--900">
        <SectionHead title={title} description={description} align="start" />

        <div className={['c-steps-split', reverse ? 'c-steps-split--reverse' : ''].filter(Boolean).join(' ')}>
          <ol className="c-steps-split__list l-stack l-stack--600">
            {steps.map((step, i) => (
              <li key={step.title} className="l-row" style={{ gap: 'var(--space-400)', alignItems: 'flex-start', flexWrap: 'nowrap' }}>
                <span className="c-steps-split__num body-xxs-semibold">{i + 1}</span>
                <span className="l-stack l-stack--100">
                  <span className="heading-md-semibold">{step.title}</span>
                  {step.description && <span className="body-md-regular">{step.description}</span>}
                </span>
              </li>
            ))}
          </ol>

          <div className="c-steps-split__media">
            <Media {...(media || {})} ratio={media?.ratio || '4 / 5'} label={media?.label || 'App screen'} />
          </div>
        </div>
      </div>
    </section>
  )
}
